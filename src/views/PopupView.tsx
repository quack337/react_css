import { useReducer } from 'react';
import styled from 'styled-components';
import Popup, { popupReducer, contextMenuHandler } from '../components/Popup';
import Confirm, { confirmReducer } from '../components/Confirm';
import Message, { messageReducer } from '../components/Message';

const Main = styled.main`
  p button { margin-right: 1em; }`;

export default function PopupView() {
  const [popupState, popupDispatch] = useReducer(popupReducer, {visible: false});
  const [confirmState, confirmDispatch] = useReducer(confirmReducer, {visible: false});
  const [messageState, messageDispatch] = useReducer(messageReducer, {visible: false});
  return (
    <Main {...contextMenuHandler(popupDispatch)} >
      <h1>Popup 연습</h1>
      <p>one one one one </p>
      <p>two two two two two </p>
      <p>three three three three three
        <label>
        <input type="checkbox"
          onChange={e => popupDispatch(e.target.checked ? ["selector", "input"] : ["hide"])}
          checked={popupState.visible} /> popup
        </label>
      </p>
      <label>
        <input type="checkbox"
          onChange={e => popupDispatch(e.target.checked ? ["tag", e.target] : ["hide"])}
          checked={popupState.visible} /> 팝업
      </label>
      <p>four four four four four four four </p>
      <p>&nbsp;</p>
      <p>
        <button onClick={() => confirmDispatch(["show"])}>삭제1</button>
        <button onClick={e => confirmDispatch(["tag", e.currentTarget])}>삭제2</button>
        <button onClick={() => messageDispatch(["show"])}>메시지1</button>
        <button onClick={e => messageDispatch(["tag", e.currentTarget])}>메시지2</button>
      </p>

      <Popup state={popupState} dispatch={popupDispatch}>Popup 팝업</Popup>
      <Confirm state={confirmState} dispatch={confirmDispatch} action={() => alert("학인")}>
        삭제하시겠습니까?
      </Confirm>
      <Message state={messageState} dispatch={messageDispatch}>
        저장성공!
      </Message>
    </Main> )
}
