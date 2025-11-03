//基本的なUIコンポーネントのサンプル

// Props(中身が変わる部分)の型定義
type TestUiProps = {
  testId: string; //文字列を渡すとき
  testFunction: () => void; //関数(処理)を渡すとき
};

// コンポーネント本体
const Testui = ({ testId, testFunction }: TestUiProps) => {
  // Propsで渡したい内容を「{}:宣言したProps」の中で受け取る。
  return (
    <>
      <div>Test UI Component</div>
      <h1>{testId}</h1>
      <button onClick={testFunction}>Click Me</button>
    </>
  );
};

export default Testui;
