import { ReactNode, useEffect, memo } from "react";
import Popup, { PopupAction, PopupDispatch, popupReducer, PopupState } from './Popup';
import './Confirm.scss';
export {contextMenuHandler} from './Popup';

export type MessageState = PopupState;
export type MessageAction = PopupAction;
export type MessageDispatch = PopupDispatch;
export const messageReducer = popupReducer;

export type MessageProps = {state: MessageState, dispatch: MessageDispatch, children: ReactNode};

function MessageImpl({state, dispatch, children}: MessageProps) {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      dispatch(["hide"]);
      e.preventDefault();
      (document?.activeElement as HTMLElement)?.blur();
    }
    document.addEventListener("keydown", keydown, true);
    return () => document.removeEventListener("keydown", keydown, true);
  }, []);
  return (
    <Popup state={state} dispatch={dispatch} modal={true}>
      <div className="confirmBody">
        {children}
      </div>
      <div className="confirmButtons">
        <button className="primary" onClick={() => dispatch(["hide"])}>확인</button>
      </div>
    </Popup> )
}

const Message = memo((props: MessageProps) =>
  (<>{props.state.visible && <MessageImpl {...props} />}</>));

export default Message;