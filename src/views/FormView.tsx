import styled from "styled-components";
import Form from "../components/Form";

const Main = styled.main`
  width: 25em; margin: 0 auto; padding: 2em 4em;
  box-shadow: .2em .2em .8em rgba(0,0,0,.2);
  border-radius: .7em;
  form {
    display: grid; gap: 1em 1em;
    grid-template-columns: auto 1fr;
    & > label:nth-child(2n-1) { padding-top: .2em; }
    .buttons {
      grid-column: 1 / span 2; padding-left: 3em;
      button   { margin-right: 1em; }
    }
  }
`;

export default function FormView() {
  return (
    <Main>
      <h1>입력 폼</h1>
      <Form>
        <label>학번</label> <input type="text" />
        <label>이름</label> <input type="text" />
        <div className="buttons">
          <button className="primary">저장</button>
          <button>취소</button>
        </div>
      </Form>
    </Main> );
}