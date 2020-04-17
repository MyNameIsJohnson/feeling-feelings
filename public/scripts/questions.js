let anger = [
  'angry', 'mad', 'frustrated', 'pissed', 'pissed off', 'ticked off', 'hot', 'heated', 'violent', 'destructive'
];

let fear = [
  'anxious', 'worried', 'scared', 'nervous', 'fearful', 'fear', 'destrubed', 'obese'
];

let happy = [
  'happy', 'releaved', 'relief', 'good', 'joyful', 'thrilled', 'excited', 'alive', 'motivated', 'swell', 'not bad', 'well', 'optimistic', 'calm', 'relax', 'relaxed', 'comfortable', 'cheerful', 'confident', 'friendly', 'glad', 'hopeful', 'loved', 'safe', 'pleased', 'special', 'proud', 'horny'
];

let sad = [
  'sad'
];

function submitName(){
  let name = $('.userName').val();
      name = name.toUpperCase();
      greet = `Hi ${name}! <br /> Glad you could check in with us. <br /> So, in one word, describe how you are feeling right now.`;
let par = $('<h3 class="nameSubmit">');
      
  $(par).append(greet);
  $('.card-title').remove();
  $('#greeting').before(par);
  $('.userName').remove('.userName');
  $('.sendBtn').remove('.sendBtn');
  $('.userFeeling').removeClass('hidden');
  $('.sendFeelingBtn').removeClass('hidden');
  
};

function submitFeeling(){
  let userFeeling = $('.userFeeling').val();
      userFeeling = userFeeling.toLowerCase();
      myReply = `So you are feeling ${userFeeling} today, huh? <br/> What's been happening that's making you feel ${userFeeling}?`;  
      let par = $('<h3 class="feelingSubmit">');
      
  $(par).append(myReply);
  $('.nameSubmit').remove();  
  $('#greeting').before(par);
  $('.userFeeling').addClass('hidden');
  $('.sendFeelingBtn').remove('.sendFeelingBtn');
  $('.userQuestion1').removeClass('hidden');
  $('.sendQuestion1Btn').removeClass('hidden');
};

let appendResults = function(){
  $('.feelingSubmit').remove();
  $('#greeting').before(par);
  $('.userQuestion1').remove('.userQuestion1');
  $('.sendQuestion1Btn').remove('.sendQuestion1Btn');
};
function feeling(){
  let userFeeling = $('.userFeeling').val();
  let par = $('<h3 class="question">');     
  for (let i = 0, j = 0, k = 0; i < anger.length, j < fear.length, k < happy.length; i++, j++, k++){
    if (userFeeling === anger[i]){
      let reply = `You don't need to allow yourself to fee that way. Anger is a secondary emotion that can become a very negative emotion. Try to reflect on the underlying cause of that feeling of ${userFeeling}. What works best for me is taking deep in breaths. And long slow out breaths. Meditation helps me too. Signup and connect with others that practice anger management through meditation.`;
      $(par).append(reply);
      $('.feelingSubmit').remove();
      $('#greeting').before(par);
      $('.userQuestion1').remove('.userQuestion1');
      $('.sendQuestion1Btn').remove('.sendQuestion1Btn');

    }else if (userFeeling === fear[j]){
      let reply = `Fear is one of the primary emotions that can lead to other negative, destruptive emotions that can cause destructive behaviors`;
      $(par).append(reply);
      $('.feelingSubmit').remove();
      $('#greeting').before(par);
      $('.userQuestion1').remove('.userQuestion1');
      $('.sendQuestion1Btn').remove('.sendQuestion1Btn'); 

    }else if (userFeeling === happy[k]){
      let reply = `That is amazing! Did you know that being ${userFeeling} can save lives? `;
      $(par).append(reply);
      $('.feelingSubmit').remove();
      $('#greeting').before(par);
      $('.userQuestion1').remove('.userQuestion1');
      $('.sendQuestion1Btn').remove('.sendQuestion1Btn'); 
    }
  }
};
$('.userName').on('click', function (e){
  $('.main-card').removeClass('col-md-4')
  $('.main-card').addClass('questions');  
  
})
$('.sendBtn').on('click', function (e){
  let name = $('.userName').val();
  if (name.length === 0){
    alert('Please Enter your name');
  }else{
    e.preventDefault();
    return submitName();
  }
});

$('.sendFeelingBtn').on('click', function (e){
  let userFeeling = $('.userFeeling').val();
  if (userFeeling.length === 0){
    alert('Please Enter your Feeling');
  }else{
    e.preventDefault();
  return submitFeeling();
  }
});

$('.sendQuestion1Btn').on('click', function (e){
  let userQuestion1 = $('.userQuestion1').val();
  if (userQuestion1.length === 0){
    alert('Please Enter your thoughts');
  }else{
    e.preventDefault();
  return feeling();
  }
});




