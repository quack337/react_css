import { ReactNode, CSSProperties, MouseEvent } from "react";
import './Popup.scss';

export type PopupState = {visible: boolean,
  selector?: string, event?: MouseEvent<any>, tag?: HTMLElement};

export type PopupAction = ["selector", string] | ["event", MouseEvent<any>] |
  ["tag", HTMLElement] | ["show"] | ["hide"];

export type PopupDispatch = (action: PopupAction) => void;

export const popupReducer = (state: PopupState, [key, value]: PopupAction): PopupState =>
    key === "hide" ? (state.visible ? {visible: false} : state) :
    key === "show" ? (state.visible ? state : {visible: true} ) :
    {visible: true, [key]: value};

export const contextMenuHandler = (dispatch: PopupDispatch) => {
  const onRightClick = (e: MouseEvent<HTMLElement>) => {
    if (e.nativeEvent.button === 2) {
      dispatch(["event", e]);
      e.preventDefault();
    }
  };
  return {onClick: onRightClick, onContextMenu: onRightClick}
}

const getPositionFromTag = (tag: Element): CSSProperties =>
  ({left: (tag.getBoundingClientRect().x || 0) + 5 + "px",
    top: (tag.getBoundingClientRect().y || 0) + 25 + "px"});

const getPosition = ({selector, event, tag}: PopupState): CSSProperties => {
  if (selector) {
    const tag = document.body.querySelector(selector);
    if (tag) return getPositionFromTag(tag);
  }
  if (event) {
    const left = event.clientX + "px";
    const top = event.clientY + 25 + "px";
    return {left, top};
  }
  if (tag) return getPositionFromTag(tag);
  return {};
}

export type PopupProps = {state: PopupState, dispatch: PopupDispatch, modal?: boolean, children: ReactNode}

export default function Popup(props: PopupProps) {
  if (!props.state.visible) return null;
  const hide = (e: MouseEvent<any>) => { e.preventDefault(); props.dispatch(["hide"]); };
  const style = getPosition(props.state);
  const backdropProps = props.modal ? {className: "popup-backdrop modal"} :
          {className: "popup-backdrop", onClick: hide, onContextMenu: hide};
  const popupClass = Object.keys(style).length === 0 ? "popup center" : "popup";
  return (
    <div {...backdropProps}>
      <div className={popupClass} style={style}>
        {props.children}
      </div>
    </div>
  )
}
