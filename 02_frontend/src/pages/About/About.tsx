import useToggle from '../../hooks/useToggle'

function About() {
  const [isOpen, toggle] = useToggle(false)
  return (
    <div>
      <h2>About</h2>
      <p>このアプリの説明ページです。</p>
      <button onClick={toggle}>{isOpen ? '詳細を閉じる' : '詳細を表示'}</button>
      {isOpen && (
        <div style={{ marginTop: 8 }}>
          <p>useToggle フックの動作確認用の詳細セクションです。</p>
        </div>
      )}
    </div>
  )}

export default About


