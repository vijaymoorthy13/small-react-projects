import React, { useState } from 'react';
import data from './data';
import SingleQuestion from './Question';
function App() {
  
  const [questions,setsingleQuestion] = useState(data)

  return (
    <main>
      <div className='container'>
        <h3>Question and Answers</h3>
          <section>
            {questions.map((question) =>{
               return <SingleQuestion key={question.id}{...question}/>
            } )}
          </section>
      </div>
    </main>
  )
}

export default App;
