window.onerror = function (errorMsg, url, lineNumber) {
    // alert(errorMsg);
};

var synth = window.speechSynthesis;

var input_el = document.getElementById("input");
var speak_btn = document.getElementById("speak_btn");
var result_btn = document.getElementById("result_btn");
var result_block = document.getElementById("result");
var img = document.getElementById("img");
var select = document.getElementById("select");
var my_text = "";
var norepeat = false;

var voices = [];

// for (i = 0; i < voices.length; i++) {
//     console.log(i);
//     var option = document.createElement('option');
//     option.textContent = voices[i].name + ", " + voices[i].lang;
//     if (voices[i].default) {
//         option.textContent += ' -- DEFAULT';
//     }
//     select.appendChild(option);
// }

function populateVoiceList() {
    console.warn("populateVoiceList");
    voices = synth.getVoices();
    console.log(voices);
    var selectedIndex = select.selectedIndex < 0 ? 0 : select.selectedIndex;
    select.innerHTML = '';
    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        select.appendChild(option);
    }
    select.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speaker() {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    console.log(voices.length);
    console.log(voices);
    if (voices.length < 1) {
        populateVoiceList();
    }
    // var voices = window.speechSynthesis.getVoices();
    // var text = my_text;
    // var text = input_el.value;
    var text = wording[Math.floor(Math.random() * wording.length)][0];
    var msg = new SpeechSynthesisUtterance(text);

    // alert(JSON.stringify(voices));
    // alert(JSON.stringify(voices[0]));
    // console.log(voices);
    var selectedOption = select.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            msg.voice = voices[i];
        }
    }
    // msg.voice = voices[20]; // 每台電腦/瀏覽器結果可能略有不同
    // msg.lang = "zn-TW";
    msg.pitch = 1;
    msg.rate = 1;

    result_block.innerHTML += "<p>" + text + "</p>";

    img.src = images[Math.floor(Math.random() * 1 * images.length)];
    synth.speak(msg);
}

function speak() {
    speak_btn.style.display = "none";
    result_btn.style.display = "block";
    // input_el.value = "";
    // input_el.focus();
    if (recognition) {
        recognition.start();
    }
    norepeat = true;

}

function result() {
    result_btn.style.display = "none";
    speak_btn.style.display = "block";
    if (recognition) {
        recognition.stop();
    }
    speaker();
}

// select.onchange = function () {
//     console.warn("select.onchange");
//     speak();
// }

var images = [
    ['https://carrefour.friendo.com.tw/Campaign/trygon/images/kv-mom_001.png'],
    ['https://carrefour.friendo.com.tw/Campaign/trygon/images/kv-mom_002.png'],
    ['https://carrefour.friendo.com.tw/Campaign/trygon/images/kv-mom_003.png'],
    ['https://carrefour.friendo.com.tw/Campaign/trygon/images/rule-mom.png']
]

var wording = [
    ['母湯卵共'],
    ['我聽不懂內'],
    ['你講那些福媽沒興趣啦 講一些卡促咪欸 讓福媽開心 我就包個紅包給你啊'],
    ['唉唷 就緣投捏 福媽親幾咧'],
    ['普吃客吃 普吃客吃 普吃普吃 吃普客吃']
];


var wording2 = [
    ['阿唷~福媽聽不懂那些五四三的啦~ 阿不然你平常喜歡唱什麼歌蛤? 福媽唱給你聽要不要?'],
    ['阿~福媽有年紀了，跟不上年輕人的話題啦，阿還是你喜歡吃什麼? 福媽去家樂福買給你吃啦!'],
    ['講一些福媽聽得懂的啦，不然偶很無聊捏！'],
    ['你們在供蝦咪?  也讓福媽參與一下啦~ 啊我也是會講fashion的話啊!'],
    ['跨攏謀 也讓福媽有點參與感好不好~ 啊我跟你講啦! 福媽上次跟團去日本玩吼~ 架促咪內! '],
    ['欸欸欸，福媽也想加入話題啦～ 阿還是你去揪幾個咖 我們來打衛生麻將好不好啊?'],
    ['你們講那些福媽都不知道啦~ 我還是去看電視卡實在!'],
    ['不要讓福媽當邊緣人啦～ 偶又不速那個浩浩，阿你有沒有聽過敬老尊賢蛤?'],
    ['吼 都講一些我看不懂的內! 跟我孫子讀的書一樣 啥米國語英文數學我有看沒有懂'],
    ['吼 看你們講話吼~ 就跟我們家阿福一樣啦 愛講那些有的沒的'],
    ['聽你們講這些吼~ 不如我去陪孫子看卡通啦 '],
    ['阿唷~ 你們講這些我沒有興趣啦! 阿不然你講一些我喜歡的 說不定我會給你一個紅包內!'],
    ['你講那些福媽沒興趣啦! 講一些卡趣味欸啦 讓福媽開心~我就包個紅包給你啊!'],
    ['我跟你講啦~ 福媽平常吼~ 喜歡逛家樂福啦 阿你如果講一些家樂福的東西吼~ 說不定會給你一個紅包內!'],
    ['告訴你啦! 福媽最喜歡看電視啦! 尤其是周星馳的電影吼~ 架促咪內!'],
    ['我孫子平常最喜歡找我一起看卡通啦~ 阿但是吼! 現在的卡通都演一些543內'],
    ['我孫子平常也喜歡找我一起念書 阿但是我覺得那個太難啦! 我只有高中畢業內!'],
    ['你講那些我沒興趣啦! 要不要福媽教你怎麼樣拜拜蛤? 要的話跟我說你要"普渡教學"內~'],
    ['福媽跟你講~ 我們人吼! 要有一點社會責任啦! 像養貓養狗就要對牠們一輩子負責阿!'],
    ['要常常跟福媽聊天內! 說不定會有意想不到的驚喜喔!'],
    ['我們人哪~ 要常常關心周遭的事情~ 像你如果常常跟福媽打招呼 說不定福媽會包個紅包給你喔!'],
    ['福媽常常覺得吼~ 我們以前的廣告跟流行歌都馬比現在的有趣~ 真的是一代不如一代啦!'],
    ['你會不會講台語蛤? 有很多台語俗諺其實都是我們以前人的智慧傳承內!'],
    ['講到那個阿福吼~ 他小時候不好好念書 整天在那邊學偶像劇台詞! 有影係猴囡仔'],
    ['唉唷喂呀 剛剛手機摔地上啦!'],
    ['人家說吼! 家有一老~ 如有一寶~'],
    ['跟你們說啦! 我們家那個阿福吼~ 有影係不孝 去台北工作那麼多年 阿都沒有帶女朋友回來內!'],
    ['阿隔壁又在吵架啦? 我企看看怎麼回事喔'],
    ['你知道福媽最喜歡的明星素隨嗎? 齁齁~ 不告訴你啦!'],
    ['是又在講什麼啦? 偷偷說福媽的壞話逆?'],
    ['唉唷那天聽我們家金孫在念那個很長的英文字  阿不知道是什麼東西內'],
    ['隔壁阿梅最近在問說基金買哪支好? 阿我又沒買過我哪裡會知道蛤?'],
    ['對啦對啦 想什麼就去做 不要讓機會跑掉內!'],
    ['人家說啦~ 吃果子也要拜樹頭~ 意思就是要飲水思源內!'],
    ['你知不知道什麼是真正的平安啊? 福媽知道但不告訴你 '],
    ['唉唷我東西忘在家樂福啦~ 你知不知道他們家電話蛤?'],
    ['喔我記得以前有一句很出名內! 那個啥米貓... 唉唷想不起來了啦!'],
    ['阿你有沒有看過環珠格格蛤? '],
    ['福媽吼! 平常最喜歡作環保啦~ 人家都馬叫我環保格格~'],
    ['阿唷昨天我們家金孫在背那個圓周率啦! 厚~真的有夠難我看的頭都痛了'],
    ['不要講那麼多啦! 先陪我去家樂福傳拜拜啦!'],
    ['有些事情就是要做了才知道~ 古人說那句什麼... 阿人老了想不起來啦!'],
    ['上個月吼! 阿福難得回來看我啦~ 阿但是整天就拿著手機在那邊玩 有影係猴囡仔!!!'],
    ['要早睡早起啦! 這樣身體才會勇健~'],
    ['這個我不太清楚內~ 要不要我企幫你問問我們家阿福蛤?'],
    ['啥米啥米? 剛剛阿蘭打電話來 我沒有聽到你說啥內'],
    ['人生吼~ 就親像海波浪! 有起也有落!'],
    ['都可以啦~ 做人不用那麼計較啦!'],
    ['是不是又在講福媽壞話啦?'],
    ['你們現在年輕人吼! 頭殼不知道裝些什麼啦! 整天想一些有的沒的'],
    ['啥米啦! 很忙內'],
    ['你們在公蝦咪碗糕？我剛剛去陪孫子念書 沒跟上話題捏'],
    ['我在家樂福買菜～'],
    ['你們覺得偶做的長輩圖漂亮嗎'],
    ['阿福不知道什麼時候才會帶女友回來給我看？'],
    ['阿福一直沒交女友，福媽好著急哦'],
    ['阿福是不是就是傳說中的魯蛇啊？他都沒帶女生回來過捏'],
    ['夏天要注意防曬捏，曬傷就不好了！'],
    ['偶就跟你說家裡的金條...阿錯頻....'],
    ['拍謝捏...錯頻了'],
    ['有看到阿福跑去哪了嗎？'],
    ['可以幫偶叫阿福回家吃飯嗎？'],
    ['你們覺得今天晚餐要煮什麼好?'],
    ['啊...等偶一下，一定又是隔壁的貓咪打翻偶家的花盆了'],
    ['偶跟你說猜彩蛋就是跟現在很紅的密室逃脫一樣，要仔細觀察！'],
    ['你覺得呢?'],
    ['有時候吼～人老了！事情容易忘記，啊偶多問幾次，不要生氣嘿'],
    ['昨天爬山爬得好累內，福媽今天公休不煮飯了'],
    ['最近常常看到年輕人舉著手機邊走邊講話，恩災西勒衝蝦咪？'],
    ['你們覺得福媽做直播會紅嗎？'],
    ['把偶加入群組啦 偶很會聊天捏'],
    ['你知道老人家碎碎念是想要刷一下存在感嗎？'],
    ['啊你多久沒有好好坐下來跟父母聊聊天了？'],
    ['不要嫌老人家囉嗦，偶們只是想跟你聊聊天'],
    ['你們先聊，偶企廁所一下'],
    ['哎呀！偶的湯滾了'],
    ['二樓的朋友你們好嗎'],
    ['明天農曆幾號啊？'],
    ['啊！阿福明天的早餐還沒買，偶企買一下'],
    ['忘記叫瓦斯了，挖卡手機阿叫一下'],
    ['你們聊到哪裡了~'],
    ['隔壁老王又變鬼變怪了？偶企叫他安靜一下你們聊'],
    ['平安喜樂，吉祥如意'],
    ['阿福都不跟偶聊天，只有你們陪福媽感動捏'],
    ['每天都要有三好，精神好、身體好、心情好'],
    ['忘了買牛奶！偶先企一下家樂福'],
    ['心情好，人不老，笑一笑，沒煩惱'],
    ['阿然後咧~~'],
    ['你們剛剛說到哪了~~'],
    ['繁華的夜都市~燈光閃閃爍~♪~'],
    ['啊！我的滷肉忘記翻了~偶企翻一下'],
    ['人生就像一場戲，因為有緣才相聚，認同請分享'],
    ['阿梅等等要約我去家樂福，挖先企準備一下'],
    ['要不要喝口水再講'],
    ['啊~不見中秋又逢冬，只有玫瑰雪中紅~♪~來賓請掌聲鼓勵'],
    ['最近的小孩一直在路邊喵喵喵的，係恩係愛收驚一下'],
    ['最近笑年ㄟ走在路上一直碎碎念碎碎念係恩係中邪啊~金恐怖'],
    ['阿水滾了福媽企關一下'],
    ['啊~浮浮沉沉藝界人生，冷冷暖暖多變人情~♪~'],
    ['阿孫A等等要企安親班，偶先準備一下'],
    ['最近菜好貴，家樂福買比較A合'],
    ['奇怪我的皮包咧怎麼找不到'],
    ['啊我的家樂福會員卡跑企哪了'],
    ['奇怪捏我的鑰匙咧'],
    ['我接一下電話'],
    ['阿蘭真的很不會吹頭髮捏，都不澎有夠魯'],
    ['那個浴火鳳凰都不會老，不知道都喝什麼保養的'],
    ['天天煮都不知道要煮什麼傷腦筋捏'],
    ['煎炒滷拌烤~~通通難不倒'],
    ['一直哈氣流目油'],
    ['珍惜就是福，自在就快樂，認同請分享'],
    ['唉唷馬桶那A自己噴水啦~~阿福買這個是什麼啦'],
    ['阿姆阿姆'],
    ['誰開冷氣！阿福真的很浪費電捏，先聊福媽關一下'],
    ['魷魚絲那A這麼韌，嘴有夠酸'],
    ['Zzzzz...'],
    ['喔。'],
    ['說完了嗎？'],
    ['丟啦~丟啦~哩公蝦密巄丟~'],
    ['呵啊(打哈欠)'],
    ['哈啾~~~！是誰在想我？'],
    ['呷霸緊睏啦~ 打岡公嘿五四三欸'],
    ['吃飽又想睡了...'],
    ['但幾勒~ 福媽先接個電話'],
    ['你有看到我的不求人嗎？有人又在皮癢了'],
    ['你看福媽有笑嗎？'],
    ['山珍是老薑YA~ 海味是鹽巴YO~'],
    ['安捏喔~'],
    ['水喔~'],
    ['啊~忘記曬的衣服還沒收'],
    ['不聽老人言，吃虧在眼前'],
    ['福媽吃過的鹽巴，比你吃過的飯還多！'],
    ['熱死了？冷氣濾網有沒有洗啊！'],
    ['有話慢慢說，福媽又不會跑掉~'],
    ['這工作還真難做，每天回你們LINE就飽了！'],
    ['阿啾~~鼻子好癢'],
    ['啊~機車快沒油了，等等來企加'],
    ['雙人枕頭，若無你，也會孤單~♫~'],
    ['啊！我的口袋有200塊~撿到撿到了'],
    ['巷口老李約我明天爬山運動，我企準備一下'],
    ['瓦斯來了，福媽開一下門'],
    ['最近要省一點，來企家樂福'],
    ['朦朧的街燈，靜靜躺在小雨中~♫~'],
    ['別人的性命是框金又包銀，阮的性命不值錢~♫~'],
    ['怎麼會熱成這樣快燒起來囉'],
    ['口說好話，心想好意，認同請分享'],
    ['福媽泡個茶，你們先聊'],
    ['厚！阿福電風扇都不洗，難怪都沒風'],
    ['福媽頂樓種的絲瓜忘記澆水了~'],
    ['夏天做點涼拌菜來配飯最開胃了'],
    ['福媽嘎你貢，洗米水千萬別丟棄，拿來洗碗很好洗'],
    ['小黃瓜要用拍得去涼拌比較入味'],
    ['福媽燙青菜的時候，都會在滾水中加入一點鹽和油，青菜可以很翠綠捏'],
    ['福媽煎魚的時，先撒一些鹽在鍋中，這樣煎魚都不會沾鍋喔'],
    ['熱到頭髮都打條囉~'],
    ['福媽切洋蔥的時候，會先冰一陣子再切，比較不會流眼淚喔'],
    ['福媽煮水餃的時候齁，都會在水中加點鹽，皮煮起來比較不會破喔'],
    ['不要問，很恐怖'],
    ['嘞係家樂福~~'],
    ['福媽炒香菇、菇類前阿，都先汆燙，顏色比較不會變黑'],
    ['黑丟，阿然後咧'],
    ['耳朵好癢，是誰在偷罵我'],
    ['福媽企家樂福買苦瓜的時候，都會挑表面顆粒大，顏色白一點卡好吃'],
    ['福媽炒茄子前，都會切完用鹽水浸泡一下，炒完顏色比較不會黑黑的揪水'],
    ['冷氣的濾網記得洗捏，比較省電比較涼'],
    ['蛤? '],
    ['都可以啦'],
    ['什麼都要找我，阿我是有跟你收錢逆?'],
    ['心想好事 口說好話 後面忘記了啦'],
    ['阿你怎麼不去問問神奇的海螺捏?'],
    ['我不知道不要問我喔'],
    ['你們現在年輕人很麻煩內! '],
    ['生命誠可貴啦!'],
    ['有時候吼~ 放手才能擁有更多啦!'],
    ['做人不要太執著~ 知足才能常樂內!'],
    ['要會為未來打算~ 不然老了會很辛苦喔'],
    ['我們都很幸運~ 要好好珍惜~'],
    ['把握時間~ 光陰一去不復返~'],
    ['生命永遠會找到出路啦!'],
    ['欸? 我們家阿福打給我內!! 等我一下喔~'],
    ['阿福是我小兒子啦 我孫子是大兒子生的阿'],
    ['我不知道你說的那個 但是我知道家樂福最近有優惠阿'],
    ['人家電影裡也這樣講啦~ 能力越強責任越大阿'],
    ['阿修但修但，我們家小黑又亂棒了啦~ 我去處理一下內'],
    ['阿你有沒有認識好的女孩子? 可不可以介紹給我們家阿福蛤?'],
    ['我沒念什麼書啦! 但是你講那個我有聽過內'],
    ['救人喔~ 不要什麼事都找我啦!'],
    ['馬路如虎口~ 阿下一句是啥? 遊子身上衣逆?'],
    ['欸啊我跟你講 你不要跟別人講喔~ 上次跟阿蘭出去玩吼~ 她跟我講她老公有小三內!'],
    ['上次跟阿蘭唱卡啦OK 結果她孫女講說我們都只會唱老歌內 阿"家後"是有多老?'],
    ['阿蘭她孫女整天在巷子口那邊對著手機跳舞啦 都沒在怕危險的內'],
    ['你們年輕人的事我沒有意見啦! 阿不要作一些傷天害理的事就好啦'],
    ['這個你們年輕人自己決定啦! 我都沒有意見'],
    ['你開心就好啊~ 我老人家講什麼你哪有在聽?'],
    ['阿我都當阿罵了 是有什麼大風大浪我沒看過?'],
    ['無聊的話可以去家樂福逛逛阿'],
    ['說要到做到嘿！'],
    ['你看到福媽的眼鏡嗎？'],
    ['沒意見捏'],
    ['都可以啦'],
    ['福媽無可奉告'],
    ['肖年郎 喝酒不開車  喝酒不開車'],
    ['給福媽一個beat'],
    ['偶可以幫忙唱HOOK喔'],
    ['福媽這個勸拜專員還稱職嗎？'],
    ['可以再說一次嗎？'],
    ['都好啦～ 你們年輕人開心，福媽就開心了'],
    ['好像很不錯捏'],
    ['你們打太快偶會不知道要回哪一句啦'],
    ['偶老人家有時候回比較慢，體諒一下嘿'],
    ['溫孫吵著要吃布丁，偶企買一下嘿'],
    ['可以自己想一下再來問福媽嗎？'],
    ['吼問題很多捏，這工作真難做'],
    ['晚上要早點睡！不要一直熬夜啦'],
    ['不要太晚回家嘿'],
    ['福媽不懂年輕人的世界啦'],
    ['你剛剛說什麼？'],
    ['福媽尊重年輕人的意見'],
    ['其他人的意見呢？'],
    ['不嫌福媽囉嗦嘿'],
    ['食人一口，還人一斗'],
    ['一寸光陰一寸金，年輕人要好好把握時光啊～'],
    ['#$%&&(()*(@啊...手機壓倒'],
    ['不要學阿福講那些五四三，多講一些福媽聽得懂的啦'],
    ['剛剛溫孫把偶的手機拿企玩，阿他有沒有亂說話啊？'],
    ['巴豆妖阿啦~'],
    ['吃飽才有力氣減肥阿'],
    ['每次坐捷運吼~車上小阿哥都會偷瞄福媽捏'],
    ['舊胎哥ㄟ捏！'],
    ['母湯卵共喔~'],
    ['農曆七月吼 平安最重要啦~'],
    ['有拜有保庇 母湯鐵齒啦！'],
    ['各位觀眾~~~~ 五 支 香 ！'],
    ['請問今年貴庚啦？'],
    ['爭什麼爭~ 摻在一起做撒尿牛丸呀'],
    ['ㄍ朵擃製儲物喔ㄐㄐㄍ    貓踩到鍵盤了啦'],
    ['蛤？你再講一次 年紀大了耳朵好像有點重聽'],
    ['你是在趕火車唷？你當福媽打字很快逆？'],
    ['哇咧，林董是老菸槍阿！'],
    ['福媽出去呼吸一下 新鮮空氣~'],
    ['賀啦'],
    ['有話好好說~ 福媽不接受告白喔！'],
    ['福媽小時候一碗陽春麵才5塊捏'],
    ['以前吼牛肉麵是眷村才吃的~ 但現在福媽也很愛吃啦！'],
    ['這個LINE的字好小~ 福媽看不到啦'],
    ['唉唷~ 要不要我介紹阿福給你認識阿！'],
    ['有沒有交往對象？要不要福媽幫你介紹'],
    ['吼~ 又在跟福媽練肖話'],
    ['安捏喔~ 賀啦 賀啦'],
    ['夭壽~ 不小心肚估了啦'],
    ['唉唷威呀! 踢到桌腳了啦~~ 疼疼疼'],
    ['偷偷爆個料~ 阿福最近又被女生打槍了 就齁糗啦~'],
    ['嘿啦~ 哩工ㄟ巄丟啦'],
    ['暑假作業不要拖到最後一天才寫捏~'],
    ['阿福昨天帶男同事來家裡吃飯，我該注意什麼嗎？'],
    ['唉唷~就緣投捏！福媽親幾咧~']
];

// console.log(wording);

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "cmn-Hant-TW";

recognition.onstart = function () {
    console.log('開始辨識...');
};
recognition.onend = function () {
    console.log('停止辨識!');
};

recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;
    if (norepeat) {
        result_block.innerHTML += "<p class='blue'>" + text + "</p>";
    }
    norepeat = false;
};