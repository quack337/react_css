import { ReactNode, memo } from "react";
import Popup, { PopupAction, PopupDispatch, popupReducer, PopupState } from './Popup';
import './Confirm.scss';
export {contextMenuHandler} from './Popup';

export type ConfirmState = PopupState;
export type ConfirmAction = PopupAction;
export type ConfirmDispatch = PopupDispatch;
export const confirmReducer = popupReducer;

export type ConfirmProps = {state: ConfirmState, dispatch: ConfirmDispatch,
  action: () => void, children: ReactNode};

function ConfirmImpl({state, dispatch, action, children}: ConfirmProps) {
  return (
    <Popup state={state} dispatch={dispatch} modal={true}>
      <div className="confirmBody">
        {children}
      </div>
      <div className="confirmButtons">
        <button onClick={action} className="primary">확인</button>
        <button onClick={() => dispatch(["hide"])}>취소</button>
      </div>
    </Popup> )
}

const Confirm = memo((props: ConfirmProps) =>
  (<>{props.state.visible && <ConfirmImpl {...props} />}</>));

export default Confirm;