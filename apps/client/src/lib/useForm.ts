// yup
import * as yup from "yup";

import { State } from "@jay-js/system";
import { Box } from "@jay-js/ui";

type IResolver<T> = (values: T, fieldName?: string) => Promise<IFormValidateResult>;

interface IUseFormProps<T> {
  defaultValues: T;
  resolver: IResolver<T>;
  onError?: (error: any) => void;
  options?: any;
}

interface IFormValidateResult {
  errors: Array<{ path: string; message: string }>;
}

export function yupResolver<T>(schema: yup.ObjectSchema<any>): IResolver<T> {
  return async (values: T, fieldName?: string) => {
    try {
      if (fieldName) {
        await schema.validateAt(fieldName, values, { abortEarly: false });
      } else {
        await schema.validate(values, { abortEarly: false });
      }
      return { errors: [] };
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formattedErrors = error.inner.length > 0 ? error.inner : [error];
        return {
          errors: formattedErrors.map((err) => ({
            path: err.path || "unknown",
            message: err.message,
          })),
        };
      }
      return { errors: [{ path: "unknown", message: "Unknown error" }] };
    }
  };
}


export interface IUseForm<T> {
  register: any;
  formState: any;
  onChange: (e: any) => void;
  onSubmit: (callback: (ev: Event, data: T) => void) => (ev: SubmitEvent) => void;
  onError: (callback: (error: any) => void) => void;
}

export function useForm<T>({ defaultValues, resolver }: IUseFormProps<T>): IUseForm<T> {
  const formErrors = State<IFormValidateResult>({ errors: [] });
  const formValues = State<T>(defaultValues);

  const formState = {
    errors: (path: string, container?: HTMLElement) => {
      const errorContainer = container || Box();
      formErrors.sub(path, (error) => {
        const errorFound = error.errors.find((err) => err.path === path);
        errorContainer.innerHTML = "";
        if (errorFound && errorFound.message) {
          errorContainer.append(errorFound.message);
        }
      });
      return errorContainer;
    },
    setValue: (field: string, value: string) => {
      formValues.set((prev) => {
        return {
          ...prev,
          [field]: value,
        };
      });

      const fieldElement = document.querySelector(`[name="${field}"]`);
      if ((fieldElement && fieldElement instanceof HTMLInputElement) || fieldElement instanceof HTMLTextAreaElement) {
        fieldElement.value = value;
      }
    },
    setValues: (values: T) => {
      formValues.set(values);
      for (const field in values) {
        const fieldElement = document.querySelector(`[name="${field}"]`);
        if ((fieldElement && fieldElement instanceof HTMLInputElement) || fieldElement instanceof HTMLTextAreaElement) {
          fieldElement.value = values[field as keyof T] as string;
        }
      }
    },
  };

  function privateSetValue(field: string, value: string) {
    formValues.set((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  function onChange(ev: Event) {
    const element = ev.target as HTMLElement;
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      const field = element.getAttribute("name") as string;
      const value = element.value;
      privateSetValue(field, value);
      resolver(formValues.get(), field).then(validateResult).catch(validateResult);
    }
  }

  function validateResult(result: any): boolean {
    if (result.errors && result.errors.length > 0) {
      formErrors.set({ errors: result.errors });
      return false;
    }

    formErrors.get((errors) => {
      if (errors.errors.length > 0) {
        formErrors.set({ errors: [] });
      }
    });
    return true;
  }

  function onError(callback: (error: any) => void) {
    formErrors.sub("onSet", (error) => {
      callback(error);
    });
  }

  function register(field: string) {
    return {
      name: field,
      onchange: onChange,
      oninput: onChange,
      value: defaultValues[field as keyof T],
    };
  }

  function onSubmit(callback: (ev: Event, data: T) => void) {
    return (ev: SubmitEvent) => {
      ev.preventDefault();
      formValues.get((data) => {
        resolver(data)
          .then((result) => {
            const res = validateResult(result);
            if (res) {
              callback(ev, data);
            }
          })
          .catch(validateResult);
      });
    };
  }

  return {
    formState,
    register,
    onChange,
    onSubmit,
    onError,
  };
}
