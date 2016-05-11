var ldsbcLibrary = ldsbcLibrary || {}, 
	sound,//for use with Howler.js
	frameNum = 0,
	totalFrames = 30,
	autoplay = false,
	ios = /iPhone|iPad|iPod/i.test(navigator.userAgent),
	android = /Android/i.test(navigator.userAgent),
	mobile =  ios || android,
	contentFlow = {
		/*
			['id','classesToAdd',classesToRemove',['classesToAddChild','classesToRemoveChild']],
		*/
		/* ---- Frame 0 */
		0:[
			['clearObj','top left full-width full-height no-borders','z-back',['','']],
			['graphic001','top left full-width full-height','z-back off-right off-left full-height',['slow-pan-bg','']],
			['graphic003b','white-bg half-width half-height middle-x off-bottom bg-center','z-back',['','']]
		],
		1:[
			['graphic001','quarter-height','z-back full-height off-top',['','slow-pan-bg']],
			['graphic003b','middle-y middle-x background-right','z-back lose-focus third-x left off-bottom flying-off',['','']],
			['graphic003a','off-right middle-y half-width half-height background-right','z-back',['','']],
		],
		2:[
			['graphic003b','lose-focus third-x','z-back middle-x',['','']],
			['graphic003a','gain-focus two-thirds-x','z-back lose-focus off-right',['','']],
		],
		3:[
			['graphic003b','gain-focus','lose-focus',['','']],
			['graphic003a','lose-focus','gain-focus',['','']],
		],
		4:[
			['graphic003b','lose-focus','gain-focus',['','']],
			['graphic003a','gain-focus','lose-focus',['','']],
		],
		5:[
			['graphic003b','gain-focus','lose-focus',['','']],
			['graphic003a','lose-focus','gain-focus',['','wobble']],
		],
		6:[
			['graphic003b','lose-focus','gain-focus',['','']],
			['graphic003a','gain-focus','lose-focus',['wobble','']],
		],
		7:[
			['graphic003b','lose-focus','gain-focus off-top z-back',['','']],
			['graphic003a','gain-focus','lose-focus off-top z-back',['','wobble']],
			['graphic001','','off-top',['','']],
			['graphic004','off-bottom top left full-height full-width','z-back',['','slow-pan-bg']],
			['clearObj','','ultra-top z-back',['','']]
		],
		8:[
			['graphic001','off-top','',['','']],
			['graphic003b','off-top','',['','']],
			['graphic003a','off-top','',['','']],
			['graphic004','','off-bottom off-left z-back',['slow-pan-bg','']],
			['graphic005a','full-cover-bg off-right full-height-auto-width top left full-height full-width','z-back',['','']],
			['graphic005b','off-right full-height-auto-width top left full-height full-width no-borders','z-back',['','half-pan-bg']],
			['clearObj','ultra-top','z-back',['','']]
		],
		9:[
			['graphic004','off-left','',['','slow-pan-bg']],
			['graphic005a','full-width full-cover-bg','off-right lose-focus half-width z-back',['','slow-pan-bg']],
			['graphic005b','','off-right off-top z-back',['half-pan-bg','']],
			['graphic006b','off-bottom three-fourths-width three-fourths-height middle-x bottom','z-back',['','']],
			['clearObj','ultra-top','',['','']]
		],
		10:[
			['graphic005a','half-width lose-focus full-cover-bg','full-width off-top z-back',['slow-pan-bg','']],
			['graphic005b','off-right','z-back',['half-pan-bg','']],
			['graphic006b','bottom three-fourths-width three-fourths-height','top half-height half-width off-bottom lose-focus two-thirds-x z-back',['','']],
			['graphic007','off-bottom three-fourths-width three-fourths-height full-height-auto-width abs-no-border','z-back',['','']],
			['clearObj','ultra-top','z-back',['','']]
		],
		11:[
			['graphic005a','off-top','',['','slow-pan-bg']],
			['graphic006b','half-height half-width top','off-right bottom three-fourths-width three-fourths-height z-back',['','']],
			['graphic007','bottom','off-bottom hint-focus z-back',['','']],
			['graphic008a','off-top right top half-width half-height','z-back',['','']],
			['graphic008b','off-top right top half-width half-height','z-back change-bg-1',['','']],
		],
		12:[
			['graphic006b','off-right','',['','']],
			['graphic007','ultra-top hint-focus scoot-right-small','off-top off-bottom z-back',['','']],
			['graphic008a','','off-top z-back',['','']],
			['graphic008b','change-bg-1','off-top z-back',['','']],
			['graphic009a','off-bottom full-cover-bg full-width full-height top left full-height-auto-width','change-bg-2 z-back',['','']],
		],
		13:[
			['graphic007','off-bottom','',['','']],
			['graphic008a','off-top','',['','']],
			['graphic008b','off-top','change-bg-1',['','']],
			['graphic009a','change-bg-2 full-height full-height-auto-width','off-bottom  quarter-height z-back',['','both-center-bg']],
			['graphic011','off-bottom half-height half-width middle-x middle-y','z-back',['','']],
		],
		14:[
			['graphic009a',' quarter-height','full-height full-height-auto-width off-left',['both-center-bg','']],
			['graphic011','shaking-screen','off-bottom off-left z-back',['','']],
			['graphic010','off-right full-width full-height middle-x middle-y','fade-to-dark z-back',['','']],
			['graphic009b','off-right no-width no-height middle-x middle-y no-borders','expand-full z-back',['','']],
		],
		15:[
			['graphic009a','off-left','z-back',['','']],
			['graphic011','off-left','z-back',['','']],
			['graphic010','fade-to-dark','off-right z-back',['','']],
			['graphic009b','expand-full','off-right off-top z-back',['','']],
		],
		16:[
			['graphic010','full-height full-width left','quarter-height quarter-width right off-left z-back',['','bg-change-3']],
			['graphic009b','off-top','z-back',['','']],
			['graphic014b','off-bottom abs-no-border no-height no-width middle-x middle-y','full-height full-width z-back',['','']],
			['graphic014a','off-bottom abs-no-border background-bottom half-height half-width middle-x middle-y','full-height full-width z-back',['','']],
		],
		17:[
			['graphic010','quarter-height quarter-width left top off-left','full-height full-width middle-x middle-y z-back',['bg-change-3','']],
			['graphic014b','monster-grow','off-top off-bottom z-back',['','']],
			['graphic014a','full-height full-width','off-top off-bottom z-back',['','']],
			['graphic015','off-bottom three-fourths-height three-fourths-width middle-x middle-y','quarter-height z-back',['','']],
		],
		18:[
			['graphic014b','off-top','z-back ',['','']],
			['graphic014a','off-top','z-back',['','']],
			['graphic015','three-fourths-height three-fourths-width middle-x middle-y','off-bottom top quarter-height full-width z-back',['','both-center-bg']],
			['graphic016a','off-left three-fourths-height three-fourths-width bottom right','book-swing z-back',['','']],
			['graphic016b','off-right full-height-auto-width three-fourths-height half-width bottom right  abs-no-border over-left','flying-off half-height middle-y z-back',['','']],
		],
		19:[
			['graphic015','top left quarter-height full-width','three-fourths-height middle-x middle-y z-back',['both-center-bg','']],
			['graphic016a','book-swing','off-left z-back',['','']],
			['graphic016b','flying-off','off-right z-back',['','']],
		]
		},
	captionFlow = {
		0:[['graphic001','A new semester has started at the college and the library has been buzzing all day with subdued activity—exactly what you would expect from a library. The librarian is standing behind the circulation desk ready to assist students with any questions they might have. Lucia, a freshman enrolled in her first semester at college, approaches the desk to speak to the librarian.','lower full-caption narrator']], // Supports multiple captions
		1:[['graphic003b','Hi Lucia. Something I can help you with?','upper left-caption right-tail scoot-left']],
		2:[['graphic003a','You know my name?','upper left-caption right-tail scoot-custom']],
		3:[['graphic003b','Of course. We met at new student orientation last week.','upper right-caption left-tail scoot-right']],
		4:[['graphic003a','Oh…right. Well, I need to write a research paper for English.','upper left-caption right-tail scoot-custom']],
		5:[['graphic003b','OK. Great. What are you going to write about?','upper right-caption left-tail scoot-right']],
		6:[['clearObj','Lucia wobbles her head with uncertainty.','lower middle-x narrator']],
		7:[['graphic003a','Not sure. I was thinking I would either write about how addicting video games are or maybe about illegal immigration. I haven’t really decided.','upper left-caption right-tail extra-wide scoot-left']], 
		8:[['graphic004','The librarian comes from behind the desk and walks toward the row of computers on the south side of the library. Lucia is following close behind.','lower full-caption narrator delayed-remove'],['graphic004','I thought I would just type those into a search engine and see what comes up. That should give me a lot of sources to choose from. Then I can just pick the topic that has the most information.','upper left-caption right-tail delayed-add']], 
		9:[['clearObj','The librarian winces listening to Lucia’s plan.','lower middle-x narrator']],
		10:[['clearObj','When the librarian turns to face Lucia, she sees her typing ‘are video games addicting’ into a search engine. She panics.','upper right narrator']],
		11:[['graphic007','LUCIA! DON’T!','middle right-caption left-tail text-size5 scoot-right-small']],
		12:[['clearObj','Lucia hits enter.','narrator middle-x middle-y']],
		13:[['clearObj','Suddenly, the lights of the library begin to flicker.','lower middle-x narrator']],
		14:[['clearObj','The computer screen fills with static as it begins to shake.','lower middle-x narrator']],
		15:[['clearObj','With a loud crack, the library goes dark. A low growling noise begins to eminate in the darkness.','delayed-add-minor middle-x middle-y narrator tight-column']],
		16:[['clearObj','What happened? ','lower right-caption right-tail boost-right']], 
		17:[['clearObj','Just as suddenly as they turned off, the lights are illuminated once more. As Lucia’s eyes adjust to the sudden brightness, she sees a monster towering over the computer in front of her. His teeth are bared and drool is dripping from his mouth. Lucia jumps back in panic.','lower right narrator tight-column']],
		18:[['graphic015','AHHHHHHHH!!! ','lower left-caption right-tail text-size5']], 
		19:[['clearObj','Suddenly the Librarian comes alive. Taking a few determined strides toward the monster, she smacks the Source Monster in the face with an encyclopedia. He goes flying over the computer behind the desk into a row of bookshelves causing a loud crash.','left left-caption text-size2 absolute-bottom-left narrator']],
	},
	audioData = {
		0:'audio/Mod-1_01.mp3', // all audio driven - Blank short clips to auto advance
		1:'audio/Mod-1_02.mp3',
		2:'audio/Mod-1_03.mp3',
		3:'audio/Mod-1_04.mp3',
		4:'audio/Mod-1_05.mp3',
	},
	objectData = {
		'graphic001':['graphic001','z-back','img/graphic001.png'],
		'graphic002':['graphic002','z-back','img/graphic002.png'],
		'graphic003a':['graphic003a','off-right','img/graphic003a.jpg'],
		'graphic003b':['graphic003b','off-bottom','img/graphic003b.jpg'],
		'graphic004':['graphic004','z-back','img/graphic004.jpg'],
		'graphic005a':['graphic005a','z-back','img/graphic005a.jpg'],
		'graphic005b':['graphic005b','z-back','img/graphic005b.png'],
		'graphic006a':['graphic006a','z-back','img/graphic006a.jpg'],
		'graphic006b':['graphic006b','z-back','img/graphic006b.png'],
		'graphic007':['graphic007','z-back','img/graphic007.png'],
		'graphic008a':['graphic008a','z-back','img/graphic008a.jpg'],
		'graphic008b':['graphic008b','z-back','img/graphic008b.png'],
		'graphic008c':['graphic008c','z-back','img/graphic008c.png'],// Here
		'graphic009a':['graphic009a','z-back','img/graphic009a.jpg'],
		'graphic009b':['graphic009b','z-back','img/graphic009b.png'],
		'graphic010':['graphic010','z-back','img/graphic010.jpg'],
		'graphic011':['graphic011','z-back','img/graphic011.jpg'],
		'graphic011b':['graphic011b','z-back','img/graphic011b.png'],
		'graphic012':['graphic012','z-back','img/graphic012.jpg'],
		'graphic014a':['graphic014a','z-back','img/graphic014a.png'],
		'graphic014b':['graphic014b','z-back','img/graphic014b.png'],
		'graphic015':['graphic015','z-back','img/graphic015.jpg'],
		'graphic016a':['graphic016a','z-back','img/graphic016a.jpg'],
		'graphic016b':['graphic016b','z-back','img/graphic016b.png'],
		'graphic017b':['graphic017b','z-back','img/graphic017b.png'],
		'graphic019a':['graphic019a','z-back','img/graphic019a.jpg'],
		'graphic019b':['graphic019b','z-back','img/graphic019b.png'],
		'graphic021':['graphic021','z-back','img/graphic021.jpg'],
		'graphic022':['graphic022','z-back','img/graphic022.jpg'],
		'graphic023a':['graphic023a','z-back','img/graphic023a.jpg'],
		'graphic023b':['graphic023b','z-back','img/graphic023b.png'],
		'graphic024':['graphic024','z-back','img/graphic024.jpg'],
		'graphic025':['graphic025','z-back','img/graphic025.jpg'],
		'graphic026':['graphic026','z-back','img/graphic026.jpg'],
		'graphic027':['graphic027','z-back','img/graphic027.jpg'],
		'graphic028':['graphic028','z-back','img/graphic028.jpg'],
		'graphic029':['graphic029','z-back','img/graphic029.jpg'],
		'graphic030':['graphic030','z-back','img/graphic030.jpg'],
		'graphic031':['graphic031','z-back','img/graphic031.jpg'],
		'graphic032':['graphic032','z-back','img/graphic032.jpg'],
		'graphic033':['graphic033','z-back','img/graphic033.jpg'],
		'graphic034a':['graphic034a','z-back','img/graphic034a.jpg'],
		'graphic034b':['graphic034b','z-back','img/graphic034b.png'],
		'graphic035':['graphic035','z-back','img/graphic035.png'],
		'graphic036':['graphic036','z-back','img/graphic036.jpg'],
		'graphic037':['graphic037','z-back','img/graphic037.png'],
		'graphic038':['graphic038','z-back','img/graphic038.jpg'],
		'graphic039':['graphic039','z-back','img/graphic039.jpg'],
		'graphic040a':['graphic040a','z-back','img/graphic040a.jpg'],
		'graphic040b':['graphic040b','z-back','img/graphic040b.png'],
		'graphic041':['graphic041','z-back','img/graphic041.jpg'],
		'graphic042':['graphic042','z-back','img/graphic042.jpg'],
		'graphic043':['graphic043','z-back','img/graphic043.jpg'],
		'graphic044':['graphic044','z-back','img/graphic044.png'],
		'graphic045':['graphic045','z-back','img/graphic045.png'],
		'graphic046':['graphic046','z-back','img/graphic046.png'],
		'graphic047':['graphic047','z-back','img/graphic047.jpg'],
		'graphic048':['graphic048','z-back','img/graphic048.jpg'],
		'graphic049a':['graphic049a','z-back','img/graphic049a.jpg'],
		'graphic049b':['graphic049b','z-back','img/graphic049b.png'],
		'graphic050':['graphic050','z-back','img/graphic050.jpg'],
		'graphic051':['graphic051','z-back','img/graphic051.png'],
		'graphic13_PLACEHOLDER':['graphic13_PLACEHOLDER','z-back','img/graphic13_PLACEHOLDER.jpg'],
		'graphic17a':['graphic17a','z-back','img/graphic17a.jpg'],
		'graphic18':['graphic18','z-back','img/graphic18.jpg'],
		'graphic20':['graphic20','z-back','img/graphic20.jpg'],
		'clearObj':['clearObj','z-back','img/clearRect.png'],
	};

$('document').ready(function(){
	init();
});

var init = function(){
	setupObjects();
	bindActions();
	if(!ios){
		runFrame(0);
	} else {
		runFrame(0);
		$('.container *').hide();
		$('.tap-to-begin').addClass('faded-in');
		$('.tap-to-begin').on('click',function(){
			$('.container *').show();
			$('.tap-to-begin').addClass('off-left faded-out');
			runFrame(0);
			$('.tap-to-begin').hide(0);
		});
	}
};

var setupObjects = function(){
	$.each(objectData,function(i,obj){
		addObject('container-1',obj[0],obj[1],obj[2]);
	});
};

var addObject = function(container,id,classes,source){
	$('#'+container).append('<div id=\"'+id+'\" class="box-obj '+classes+'"><div class="inner-content" style=\"background-image:url('+source+');\"></div></div>');
};

var moveNext = function(){
	if(frameNum < totalFrames){
		frameNum++;
		runFrame(frameNum);
	}
};

var movePrev = function(){
	if(frameNum > 0){
		frameNum--;
		runFrame(frameNum);
	}
};

var bindActions = function(){
	$('.next').on('click',function(){
		moveNext();
	});
	$('.prev').on('click',function(){
		movePrev();
	});
};

var runFrame = function(num){
	showHideButtons(num);
	runAnimations(num);
	createCaptions(num);
	playAudioForSlide(num);
};

var runAnimations = function (num){
	var currentAnims = contentFlow[num];
	$.each(currentAnims, function(i, item) {
		var $currEl = $('#'+item[0]),
			classesToRemove = item[2],
			classesToAdd = item[1],
			$childEl = $currEl.find('.inner-content'),
			childClassesToRemove = item[3][1],
			childClassesToAdd = item[3][0];
		$currEl.removeClass(classesToRemove).addClass(classesToAdd);
		$childEl.removeClass(childClassesToRemove).addClass(childClassesToAdd);
	});
};

var createCaptions = function (num){
	$('.caption').html('').remove();
	var currentCaptions = captionFlow[num];
	$.each(currentCaptions, function(i, caption) {
		$('#'+caption[0]).find('.inner-content').append('<div class="caption '+caption[2]+'"><div class="caption-text">'+caption[1]+'</div></div>');
	});
	setTimeout(function(){
		$('.caption').addClass('visible');
	},800);
};

var playAudioForSlide = function (num){
	var soundToPlay = audioData[num];
	if(sound !== undefined){
		sound.pause();
		sound.unload();
	}
	if(soundToPlay !== undefined){
		sound = new Howl({
		  urls: [soundToPlay],
		  autoplay: false,
		  onend: function() {
		  	if(autoplay){
		    	moveNext();
		  	}
		  }
		}).play();
	} else {
		return;
	}
};

var advanceAfterDelay = function(time){
	setTimeout(function(){
		moveNext();
	},time);
};

var showHideButtons = function (num){
	if(num === 0){
		$('.prev').removeClass('visible');
		$('.next').addClass('visible');
	} else if (num === totalFrames) {
		$('.next').removeClass('visible');
		$('.prev').addClass('visible');
	} else {
		$('.next').addClass('visible');
		$('.prev').addClass('visible');
	}
};

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        	movePrev();
        break;

        case 38: // up
        break;

        case 39:
        	moveNext();
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        	moveNext();
            /* left swipe */
        } else {
        	movePrev();
            /* right swipe */
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}