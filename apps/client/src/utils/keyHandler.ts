type CallbackType = (event: KeyboardEvent) => void;

interface IKeyHandler {
  setKeyDownEvent(callback: CallbackType): void;
  clearKeyDownEvent(): void;
  onKeyDown(event: KeyboardEvent): void;
}

/**
 * Class responsible for handling keyboard events.
 * It allows setting a custom callback function to be called on key down events,
 * with a fallback method that logs a message to the console.
 */
class KeyHandler implements IKeyHandler {
  private callback: CallbackType;

  /**
   * Constructor of the KeyHandler class.
   * Initializes the callback with a default fallback method.
   */
  constructor() {
    this.callback = this.fallback.bind(this);
  }

  /**
   * Fallback method called when no other callback is defined by the user.
   * @param event The received keyboard event.
   */
  private fallback(event: KeyboardEvent): void {
    console.log("KeyHandler fallback");
  }

  /**
   * Sets the callback to be called when a key is pressed.
   * @param callback Function to be called with the keyboard event as an argument.
   */
  public setKeyDownEvent(callback: CallbackType): void {
    this.callback = callback;
  }

  /**
   * Clears the defined callback, reverting to the default fallback method.
   */
  public clearKeyDownEvent(): void {
    this.callback = this.fallback.bind(this);
  }

  /**
   * Called internally to handle key pressed events.
   * Should be connected to the onKeyDown event of a DOM element.
   * @param event The received keyboard event.
   */
  public onKeyDown(event: KeyboardEvent): void {
    if (this.callback) {
      this.callback(event);
    }
  }
}

export const keyHandler = new KeyHandler();
