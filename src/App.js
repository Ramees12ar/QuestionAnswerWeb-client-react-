import './App.css';
// import AddQuestions from './components/addQuestions';
import Header from './components/header';
import QuestionAnswer from './components/questionAnswer';

function App() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <Header />
      </div>
      {/* <div className="d-flex justify-content-center">
        <AddQuestions />
      </div> */}
      <div className="d-flex justify-content-center">
        <QuestionAnswer />
      </div>
    </div>
  );
}

export default App;
