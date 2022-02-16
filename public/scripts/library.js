$(()=>{
  const start = renderLibrary();

  start.then(()=>{
    $(".list-btn").on("click", hideListBtn);
  
    $(".unlist-btn").on("click", hideUnlistBtn);

    $(".del-btn").on("click", deleteBtn)

  })




});

const renderLibrary = () => {
  return $.get("/library")
  .then(results => {
    for(let result of results){
      const $quiz = renderQuizTemplate(result);
      $(".library-quizzes").append($quiz);
    }
  })
  .catch(err => console.log(err.msg));
}

const renderQuizTemplate = (quizObject) => {

  const listClass = quizObject.is_active ? "hidden" : "";
  const unlistClass = quizObject.is_active ? "" : "hidden";


  const $quizTemplate = `
  <div class="quiz-template">
        
  <div class="quiz-picture">
    <div class="number-of-questions">
      <p>${quizObject.number_of_questions} question(s)</p>
    </div>

  </div>

  <div class="quiz-information">
    <div class="quiz-primary-nav">
      <div class="quiz-title">
        <h3>${quizObject.name}</h3>
        <p>
        (# <p class="quiz-id">${quizObject.id}</p>)
        </p>
      </div>
      <div class="quiz-actions">
        <button class="unlist-holder">
          <i class="fa-solid fa-eye-slash unlist-btn ${unlistClass}"></i>
        </button>
        <button class="list-holder">
          <i class="fa-solid fa-eye list-btn ${listClass}"></i>
        </button>
        <button class="del-holder">
          <i class="fa-solid fa-trash del-btn"></i>
        </button>
      </div>
    </div>

    <div class="quiz-secondary-nav">
      <p>Created on ${quizObject.created_at}</p>
      <p>${quizObject.number_of_plays} play(s)!</p>
      <button type="button" class="btn btn-primary">Edit</button>
      <button type="button" class="btn btn-success">Play</button>

    </div>

  </div>

</div>
  `
  return $quizTemplate;
}



const hideListBtn = function(event){
  event.preventDefault();
  $(this).hide();
  const $unlist = $(this).parent(".list-holder").siblings(".unlist-holder").children(".unlist-btn");
  const id = $(this).closest(".quiz-actions").siblings(".quiz-title").children(".quiz-id").text();

  $.ajax({
    url: `/quizzes/${id}`,
    type: 'PUT',
    success: () => {
      $(this).addClass("hidden");
      return $unlist.removeClass("hidden");
    }
  })

};


const hideUnlistBtn = function(event){
  event.preventDefault();
  const $list = $(this).parent(".unlist-holder").siblings(".list-holder").children(".list-btn")
  const id = $(this).closest(".quiz-actions").siblings(".quiz-title").children(".quiz-id").text();
  console.log(id)


  $.ajax({
    url: `/quizzes/${id}`,
    type: 'PUT',
    success: () => {
      $(this).addClass("hidden");
      return $list.removeClass("hidden");
    }
  })
};


const deleteBtn = function(event){
  event.preventDefault();
  const id = $(this).closest(".quiz-actions").siblings(".quiz-title").children(".quiz-id").text();
  const $quiz = $(this).closest(".quiz-template")

  if(confirm("are you sure?")){
    $.ajax({
      url: `quizzes/${id}`,
      type: 'DELETE',
      success: () => {
        console.log('deleted')
        $quiz.remove();
      }
    })
  }


}