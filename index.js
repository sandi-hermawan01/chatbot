const messagesContent = $('.msgs-content');
const messagesInput = $('.msg-input');
const messagesSubmit = $('.msg-submit');
const avatarImage = './images/logo.png';
const fakeMessages = [
    'Hi there, I\'m zsans both and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'That\'s awesome',
    'Youtube is a nice place to share video',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new video',
    'Bye',
    ':)'
];

let minutes = 0;
$(window).on('load', function(){
    messagesContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
});

function updateScrollbar(){
    messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout:0
    });
};

function addTimestamp(){
    const date = new Date();
    const minutesNow = date.getMinutes();

    if(minutes !== minutesNow){
        minutes = minutesNow;
        const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg-last').append(timeStamp);
    };
};

function addMessageToPage(msg, isPersonal = false){
    const message = $('<div class="msg"></div>').text(msg);
    if(isPersonal){
        message.addClass('msg-personal');
    }else{
        const figure =  $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    };
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
};

function insertMessage(){
    const messageText = messagesInput.val().trim();
    if(messageText == ''){
        return false;
    };
    addMessageToPage(messageText, true);
    messagesInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
};

messagesInput.on('keydown', function(e){
    if(e.which === 13){
        insertMessage();
        return false;
    };
});

messagesSubmit.on('click', insertMessage);

function fakeMessage(){
    if(messagesInput.val() !== ''){
        return false;
    };

    const loadingMessage = $('<div class="msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($('<span></span>'));
    $('.mCSB_container').append(loadingMessage);
    updateScrollbar();

    setTimeout(function(){
        loadingMessage.remove();
        addMessageToPage (fakeMessages.shift());
    }, 1000 + (Math.random() * 20) * 100);
}