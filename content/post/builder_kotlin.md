---
title: "named parameters או למה לא צריך בילדר בקוטלין"
summary: "מכירים את זה שהורדתם סרט עם כתוביות מהאינטרנט והמתרגם לא ממש מכיר ביטויים באנגלית, אז הוא מתרגם דברים כמו ״להסיע אותי אגוזים״ או ״ללכת בננות״? תתפלאו אבל זה קורה גם בשפות תכנות. לכל שפה יש את הדרך שלה להתמודד עם אתגרים שונים, ולכן למרות שבילדר (builder) הוא דיזיין פטרן מעולה בג׳אווה, להשתמש בו בקוטלין תהיה טעות של ממש"
date: 2019-12-03T21:12:14+02:00
tags: ["קוטלין", "design_patterns"]
keywords: ["בילדר", "design patterns", "builder", "java", "kotlin"]
images: ["/post_images/builder_kotlin.jpg"]
draft: false
---

![kotlin builder](/post_images/builder_kotlin.jpg)

בפוסט הקודם על [בילדר](/post/builder), הסברנו למה בילדר זה פטרן חשוב, איפה משתמשים בו ואיך. אמרנו גם שהוא כל כך נפוץ שאתם בטח כבר משתמשים בו ולא שמתם לב. 

אז אמרנו.

וזה בהחלט היה נכון, זאת אומרת, כל עוד אתם כותבים בג׳אווה. אם אתם כותבים בקוטלין ורוצים להשתמש בבילדר, תעצרו רגע ותקראו את הפוסט הזה, כי להעתיק את בילדר מג׳אווה לקוטלין זו תהיה טעות נוראית.



## למה לא בילדר?

אז למה לא, בעצם?

אנחנו כבר יודעים איך כותבים בילדר, זה בטח אפילו יותר קצר בקוטלין, איזו סיבה יש שלא להשתמש בו?

אחת הטעויות הנפוצות שעושים מפתחים שלומדים שפה חדשה, היא לכתוב בשפה החדשה בדיוק כמו שהם כתבו בשפה הקודמת. 

בהתחלה זה יכול להישמע הגיוני, זה הרי עובד בג׳אווה, למה שזה לא יעבוד גם בקוטלין? במיוחד אם זה באמת עובד.

הסיבה היא כי זה יכול להסיע אותי אגוזים. 

מה? זה לא היה מובן? כתבתי drive me nuts, זה לא ברור?

לא. זה לא ברור בכלל. כלומר, זה ברור מאוד לדוברי אנגלית, אבל בעברית אין לזה שום משמעות. ראיתם פעם סרט עם תרגום שהורדתם והתעצבנתם כשתרגמו מילולית ביטויים באנגלית? זו התחושה גם כש״מתרגמים״ ג׳אווה ישירות לקוטלין.

אפשר לכתוב בילדר בקוטלין, אבל לקוטלין יש דרך אחרת לעשות את זה, והיא שילוב של משהו שנקרא `named arguments` ו`default arguments`.

בואו נלמד אותה

## named arguments

אחד הדברים הכי חשובים כשכותבים קוד הוא לשים לב ל**קריאות**, כלומר לכך שהקוד יהיה קריא. [Uncle Bob](https://twitter.com/unclebobmartin) אותו כבר הזכרנו בעבר, מייסדה של שיטת [Clean Code](https://blog.cleancoder.com/) מדבר על זה הרבה ולא רק הוא.

קוד קריא הוא קוד טוב יותר מכמה סיבות, גם מכיון שמפתחים אחרים יוכלו לקרוא אותו, להבין מה הוא עושה ולדעת איך להשתמש בו (או לתקן אותו). אבל גם (ובעיקר) מכיון שהוא קוד שיותר קריא לכם!

כשאתם כותבים קוד שמאוד ברור מה הוא עושה, קל יותר לאתר בו בעיות וקל יותר להימנע מהם.

וכשיש לנו פונקציה שמקבלת כמה פרמטרים כמו למשל 

{{< highlight java "linenos=table,hl_lines="  >}}

public void setImageFromRemote(String url, boolean showProgress, boolean showDefaultOnFail)

{{</highlight>}}

כשנקרא לה היא תיראה ככה

{{< highlight java "linenos=table,hl_lines="  >}}

setImageFromRemote(someUrl, true, false)

{{</highlight>}}

ועכשיו מי שיקרא את הקוד לא יכול בשום אופן לדעת על מה עשינו `true` ועל מה `false`, אלא אם כן הוא ייכנס להגדרה של הפונקציה המקורית.

הדבר הזה יכול להוביל לבאגים, אם מישהו יתבלבל בסדר של שני הבוליאנים למשל. הייתי שם, אני יודע, זה יכול לקרות.

אז מה עושים? בג׳אווה אין הרבה מה לעשות חוץ מלהתחיל להשתמש יותר בבילדר ופקטורי, ובאופן כללי [באובייקטים](https://docs.oracle.com/javase/8/docs/api/java/util/Objects.html) יותר מאשר [בפרימיטיבים](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html). 

אבל בקוטלין פתרו את הבעיה בעזרת משהו שנקרא [named arguments](https://try.kotlinlang.org/#/Kotlin%20Koans/Introduction/Named%20arguments/Task.kt). 

זה למעשה נורא פשוט, ניקח את אותה פונקציה שהשתמשנו בה קודם

{{< highlight kotlin "linenos=table,hl_lines="  >}}

public fun setImageFromRemote(url: String, showProgress: Boolean , showDefaultOnFail: Boolean)

{{</highlight>}}

ועכשיו נקרא לה בצורה הזאת

{{< highlight kotlin "linenos=table,hl_lines="  >}}

setImageFromRemote(url: someUrl, 
				 showProgress: true, 
				 showDefaultOnFail: false)

{{</highlight>}}

יפה, מה? עכשיו כל מי שקורא את הפונקציה מבין ישר מה תפקידו של כל פרמטר, זה מונע בלבול ובאגים מיותרים ומשפר דרמטית את הקריאות של הקוד.

## default arguments

אבל זה לא נגמר פה, חוץ מ`named arguments` והקריאות הנפלאה שהוא מביא לקוד, קוטלין מציגה תכונה נוספת וחשובה שבלעדיה לא נוכל ליצור בילדר.

זוכרים שבפוסט על [בילדר](/post/builder) דיברנו על [method overloading](https://beginnersbook.com/2013/05/method-overloading/)? 

בקצרה, מדובר על יצירת של כמה פונקציות עם פרמטרים שונים, כדי לאפשר שימוש בערכי דיפולט. 

למשל, אם אנחנו רוצים פונקציה שטוענת string באפליקצייה שלנו באנדרואיד, אנחנו יכולים לכתוב פונקציה כזאת

{{< highlight java "linenos=table,hl_lines="  >}}

public String getStringFromResources(Resources resources, @StringRes int resId) {
	resources.getString(resId);
}

{{</highlight>}}

אבל מה אם מישהו ירצה לקרוא לפונקציה שלנו ממקום בו אין לו גישה ל`resources`? למשל מאיזה util class? 

אנחנו יכולים לגשת ל`application class` שלנו ולבקש ממנו את ה`resources`. 

אנחנו יכולים להוסיף פונקציה שמקבלת רק את ה`resId` ומעבירה את ה`resources` לפונקציה המקורית.

זה ייראה ככה

{{< highlight java "linenos=table,hl_lines="  >}}

public String getStringFromResources(@StringRes int resId) {
	return getStringFromResources(MyApplication.getInstance().getResources(), resId);
}

{{</highlight>}}

בדרך הזו המשתמש יכול לבחור אם לקרוא לפונקציה עם `resources` משלו, או לתת לה רק את ה`resId` ושהיא תיקח את ה`resources`בעצמה.

זו תכונה נהדרת של ג׳אווה (ושל כמעט כל שפה אחרת), אבל הרבה מאוד שפות חדשות הרגישו שמשהו בפתרון הזה קצת עקום, מהר מאוד זה הופך להיות מיליון פונקציות בעלות אותו שם עם פרמטרים שונים, וזה הופך להיות נורא קשה לעקוב אחרי זה, לשנות, לערוך או להבין מה בדיוק התפקיד של כל פרמטר.

אז בקוטלין בחרו בדרך אחרת, `default arguments`. 

וזה נראה ככה

{{< highlight kotlin "linenos=table,hl_lines="  >}}

public fun getStringFromResources(resources: Resources = MyApplication.INSTANCE.resources, @StringRes resId: Int) {
	return resources.getString(resId)
}

{{</highlight>}}

במקום ליצור שתי פונקציות, אנחנו יוצרים רק פונקציה אחת אלא שהפעם אנחנו אומרים בחתימת הפונקציה שלנו שהערך הדיפולטי של `resources` יהיה `MyApplication.INSTANCE.resources`, כך שמי שקורא לפונקציה יכול לא לשלוח שום ערך ל`resources` ולפונקציה יהיה את הערך שהגדרנו כדיפולט.

הקריאה תיראה כך

{{< highlight kotlin "linenos=table,hl_lines="  >}}

getStringFromResources(resId = R.string.first_name)

{{</highlight>}}

## builder

אני חושב שאפשר כבר לראות לאן זה הולך, נכון? 

השילוב של שתי התכונות האלו די מייתר לנו את הצורך בבילדר, לא?

תזכורת קצרה לאיך נראה הבילדר שלנו בג׳אווה

<script src="https://gist.github.com/orelzion/4f881a80a5d5e109152ea550166d2071.js"></script>
והנה איך שנממש את אותו הקלאס בקוטלין

<script src="https://gist.github.com/orelzion/eddb374ccf9ccc060501e4b53dcf5558.js"></script>
מה הולך כאן? בואו נתחיל לפרק את זה אחד אחד.

אז קודם כל יצרנו `data class` בתוך ה`AlertViewDialog` כמו שעשינו בג׳אווה. 

ל`AlertViewDialog` עשינו `private constructor` שמקבל את ה`builder` כפרמטר היחיד. 

למעשה אין שום דרך ליצור `AlertViewDialog` בלי להשתמש בבילדר. 

בקונסטרקור של הבילדר שמנו את כל השדות שאנחנו צריכים כדי לבנות את ה`AlertViewDialog`, ונתנו לכל אחד מהם ערך דיפולטי `null`. 

מכיון שיש לנו ערכים דיפולטים, מי שיקרא לבילדר יוכל לבחור איזה מהערכים הוא מעוניין לתת להם ערך, ומה שהוא לא יעביר יישאר `null`. 

בקונסטרקטור של ה`AlertViewDialog` אנחנו בודקים כל ערך אם הוא לא `null` ומשימים אותו ל`view` הנכון, או מעלימים את ה`view`. 

פשוט וקל.

ואיך נראית הקריאה לבילדר שלנו? 

לא מאוד שונה מהקריאה בג׳אווה

{{< highlight kotlin "linenos=table,hl_lines="  >}}
val alertViewDialog = AlertViewDialog.Builder(
        messageText = "Some message",
        positiveBtnText = "ok",
        positiveClickListener = DialogInterface.OnClickListener { dialog, which ->

        }
).build()
alertViewDialog.show()
{{</highlight>}}

פשוט וקל כבר אמרנו.

{{<subscribe text="בקוטלין אולי לא צריך בילדר, אבל כדי לבנות ידע בתכנות צריכים לא להפסיק ללמוד!">}}

## בלי בילדר

אבל רגע אחד. למה בכלל אני צריך את הפונקציה `build`? 

אנחנו יוצרים את האובייקט `AlertViewDialog.Builder` שהוא מכיל בתוכו את כל התכונות שה`dialog` צריך, למה לא פשוט להעביר אותו ישירות לקונסטרקטור של ה`alert`? הרי אנחנו בכל מקרה עושים את זה. הפונקציה `build` היא סתם עוד שלב מיותר בדרך!

בואו פשוט ניפטר ממנה, טוב?

<script src="https://gist.github.com/orelzion/422b22bf31c3cf4f2690cfca420544e1.js"></script>
הקריאה עדיין תהיה נורא דומה, פשוט בלי הפונקציה המיותרת `build` באמצע

{{< highlight kotlin "linenos=table,hl_lines="  >}}
val alertViewDialog = AlertViewDialog(Builder(
        messageText = "Some message",
        positiveBtnText = "ok",
        positiveClickListener = DialogInterface.OnClickListener { dialog, which ->
    }

))
alertViewDialog.show()
{{</highlight>}}

אבל אם כבר הגענו עד לפה, למה בכלל אנחנו צריכים את האובייקט המיותר `Builder`? 

בג׳אווה היינו צריכים אותו כי ממנו יצרנו את ה`dialog` אבל עכשיו כשאנחנו יוצרים את ה`dialog` בעצמנו, זה מרגיש קצת מיותר, לא?

בואו נעיף אותו

<script src="https://gist.github.com/orelzion/a2c88fef9a54ee124b241cd5bb62d208.js"></script>
והקריאה אליו?

{{< highlight kotlin "linenos=table,hl_lines=1 7"  >}}
val alertViewDialog = AlertViewDialog(
        messageText = "Some message",
        positiveBtnText = "ok",
        positiveClickListener = DialogInterface.OnClickListener { dialog, which ->
    }
)
alertViewDialog.show()
{{</highlight>}}

פשוט וקל.

וזו הדרך (לא) ליצור בילדר בקוטלין.

## סוף דבר

נזכרנו קצת למה משתמשים בקוטלין, דיברנו על למה להעתיק תבניות משפה לשפה זה רעיון לא מוצלח, וראינו איך פותרים את אותה בעיה בקוטלין בלי להזדקק לאותו פתרון.

מה אומרים? איזה פתרון אתם מעדיפים? בילדר? או את הפתרון של קוטלין? יכולות לחשוב על סיבה להעדיף להמשיך להשתמש בבילדר גם בקוטלין? תכתבו לי בתגובות!