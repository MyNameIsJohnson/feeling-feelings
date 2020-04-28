let anger = [
  'angry', 'mad', 'frustrated', 'pissed', 'pissed off', 'ticked off', 'hot', 'heated', 'violent', 'destructive','acrimony','animosity','annoyance','antagonism','displeasure','enmity','exasperation','fury','hatred','impatience','indignation','ire','irritation','outrage','passion','rage','resentment','temper','violence','chagrin','choler','conniption','dander','disapprobation','distemper','gall','huff','infuriation','irascibility','irritability','miff','peevishness','petulance','pique','rankling','soreness','stew','storm','tantrum','tiff','umbrage','vexation','temper'
];
  
let fear = [
  'anxious', 'worried', 'scared', 'nervous', 'fear', 'destrubed', 'obese','angst','anxiety','concern','despair','dismay','doubt','dread','horror','jitters','panic','scare','suspicion','terror','unease','uneasiness','worry','abhorrence','agitation','aversion','awe','consternation','cowardice','creeps','discomposure','disquietude','distress','faintheartedness','foreboding','fright','funk','misgiving','nightmare','phobia','presentiment','qualm','reverence','revulsion','timidity','trembling','tremor','trepidation','chickenheartedness','cold feet','cold sweat','recreancy'
];

let happy = [
  'happy', 'releaved', 'relief', 'good', 'joyful', 'thrilled', 'excited', 'alive', 'motivated', 'swell', 'not bad', 'well', 'optimistic', 'calm', 'relax', 'relaxed', 'comfortable', 'cheerful', 'confident', 'friendly', 'glad', 'hopeful', 'loved', 'safe', 'pleased', 'special', 'proud', 'cheerful','contented','delighted','ecstatic','elated','glad','joyful','joyous','jubilant','lively','merry','overjoyed','peaceful','pleasant','pleased','thrilled','upbeat','blessed','blest','blissful','blithe','captivated','chipper','chirpy','content','convivial','exultant','flying high','gay','gleeful','gratified','intoxicated','jolly','laughing','light','looking good','mirthful','on cloud nine','peppy','perky','playful','sparkling','sunny','tickled','tickled pink','up','walking on air'
];
let sad = [
  'sad', 'depressed', 'sadden', 'grief', 'bitter', 'dismal','heartbroken','melancholy','mournful', 'pessimistic', 'somber','sorrowful','sorry','wistful','bereaved','blue','cheerless','dejected','despairing','despondent','disconsolate','distressed','doleful','down','downcast','forlorn','gloomy','glum','grief-stricken','grieved','heartsick','heavyhearted','hurting','languishing','low','low-spirited','lugubrious','morbid','morose','out of sorts','pensive','sick at heart','troubled','weeping','woebegone'
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

let userFeeling = "";

function submitFeeling(){
      userFeeling = $('.userFeeling').val();
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

let par = $('<h3 class="question">');   

let appendResults = function(){
  $('.feelingSubmit').remove();
  $('#greeting').before(par);
  $('.userQuestion1').remove('.userQuestion1');
  $('.sendQuestion1Btn').remove('.sendQuestion1Btn');
};

function feeling(userFeeling){
  userFeeling = $('.userFeeling').val();
  console.log(userFeeling)
  for (let i = 0; i < anger.length, i < happy.length, i < sad.length, i < fear.length; i++){
    
    if (userFeeling === anger[i]){
      let angerReply = `You don't need to allow yourself to feel that way. Anger is a secondary emotion that can become a very negative emotion. Try to reflect on the underlying cause of that feeling of ${userFeeling}. What works best for me is taking deep in breaths. And long slow out breaths. Meditation helps me too. Signup and connect with others that practice anger management through meditation.`;
      console.log(userFeeling)
      $(par).append(angerReply);
      return appendResults();
      
    } else if (userFeeling === happy[i]){
      let happyReply = `That is amazing! Did you know that being ${userFeeling} can save lives? `;
      console.log(userFeeling)
      $(par).append(happyReply);
      return appendResults();
      
    }else if (userFeeling === sad[i]){
      let sadReply = `Feelings of being ${userFeeling} are difficult to overcome on your own. I mean that's why you landed on this page in the first place because you want answers. Well, we want to help you on this journey of overcoming ${userFeeling}.`;
      console.log(userFeeling)
      $(par).append(sadReply);
      return appendResults();

    }else if (userFeeling === fear[i]){
      let fearReply = `Feeling of ${userFeeling} is one of the primary emotions that can lead to other negative, destruptive emotions that can cause destructive behaviors. We all struggle with our inner thoughts and emotions. Sometimes we can get trapped in them. It can feel like there is a dark cloud hanging over our heads. All we need in this time is someone to hear and understand what we feel.`;
      console.log(fearReply)
      $(par).append(fearReply);
      return appendResults();
      
    }else if(userFeeling !== anger[i] || userFeeling !== fear[i] || userFeeling !== happy[i] || userFeeling !== sad[i]){
      let sorryReply = `Sorry, we don't have understand what ${userFeeling} means and cannot provide and advice.  Please try describing your feeling using another word. Or browse our site for helpful tips to cope with this ${userFeeling}`;
      $(par).append(sorryReply);
      return appendResults();
    }
  }
};
$('.userName').on('click', function (e){
  $('.main-card').removeClass('col-md-4')
  $('.main-card').addClass('questions container');  
  
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
  console.log(userFeeling)
  let userQuestion1 = $('.userQuestion1').val();
  if (userQuestion1.length === 0){
    alert('Please Enter your thoughts');
  }else{
    e.preventDefault();
  return feeling();
  }
});

$( ".userName" ).keydown(function( event ) {
  if ( event.which == 13 ) {
    event.preventDefault();
    return submitName();
  }
});
$( ".userFeeling" ).keydown(function( event ) {
  if ( event.which == 13 ) {
    event.preventDefault();
    return submitFeeling();
  }
});
$( ".userQuestion1" ).keydown(function( event ) {
  if ( event.which == 13 ) {
    event.preventDefault();
    return feeling();
  }
});
