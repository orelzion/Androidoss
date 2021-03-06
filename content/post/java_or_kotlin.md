---
title: "ג׳אווה או קוטלין"
date: 2019-10-02T21:46:20+03:00
draft: false
keywords: ["ג׳אווה", "קוטלין", "named parameters", "null", "null check", "בדיקת null"]
tags: ["קוטלין", "מתחילים"]
---

טוב זו שאלה שיכולה להבעיר מחלקות פיתוח שלמות 😀. תשמעו מפתחים שאומרים לכם שקוטלין זה הדבר הכי טוב מאז המצאת הנורה, ומפתחים שלא מוכנים בשום אופן לעזוב את ג׳אווה.

אבל כדי לענות עליה, ננסה להבין קודם מה זה בכלל קוטלין, ובסוף ננסה להבין מה הכי כדאי למפתח המתחיל ללמוד.

# מה זה קוטלין?
קוטלין היא שפת תכנות מודרנית שפותחה על ידי [JetBrains](http://jetbrains.com/) (אותה חברה שפיתחה את IntelliJ שעליה מבוסס אנדרואיד סטודיו) בשנת 2011. בשנת 2017 היא הוכרזה כשפה רשמית לפיתוח לאנדרואיד על ידי גוגל, וכיום כל המדריכים באתר של גוגל כוללים דוגמאות קוד גם בקוטלין. 

קוטלין מכוונת להיות תמציתית, בטוחה, משותפת ונוחה על כל ide. כך לפחות היא מוצגת באתר [הרשמי](https://kotlinlang.org/).

## תמציתית
קוטלין מנסה לגרום לנו לכתוב כמה שפחות קוד, גם כדי שיהיה לנו יותר נוח, אבל גם כי פחות קוד = פחות באגים. באופן טבעי באגים נובעים מקוד, כך שככל שכתבנו פחות קוד הסיכוי שכתבנו באגים פוחת 😀.

זה בא לידי ביטוי בכך שקוטלין נטשה את סימן ה `;` שבא לסמן סוף פקודה בג'אווה, בקוטלין גם אין `new` כדי לאתחל אובייקט פשוט קוראים לקונסטרקטור שלו ישירות.

וגם לדוגמה הקלאס הפשוט הזה בג'אווה
```java
public class Dog {
    private String name;
    private String race;

    public Dog(String name, String race) {
        this.name = name;
        this.race = race;
   }

    public String getName() {
        return name;
   }

    public String getRace() {
        return race;
   }
}
```
ייראה בקוטלין ככה
```kotlin
public data class Dog(
  val name: String, 
  val race: String
)
```

כן, באמת, זה עד כדי כך קל.

אבל זה הולך אפילו יותר עמוק. אותו קלאס בקוטלין כבר מכיל פונקציית `toString` כדי שאם נבקש להדפיס אותו (למשל בלוגים) נקבל פירוט יפה של שמות המשתנים והערכים שלהם, הוא מכיל גם פונקציית `equals` כדי שאם נשווה בין שני אובייקטים מסוג `Dog` הוא יבדוק גם האם הם בני אותו גזע וגם אם יש להם אותו שם (אנחנו ממש חייבים לשפר פה את המימוש, יש עשרות כלבי זאב עם השם זאביק) ואפילו את הפונקציה `hash` כך שכל אובייקט שלנו יקבל מזהה ייחודי (יש לזה המון שימושים בתוכנה, לא כאן המקום להאריך).

כל הדברים האלה שבאים בחינם בקוטלין, נדרשים להיכתב באופן ידני בג'אווה, וכל שינוי בהגדרת המשתנים בג'אווה דורש עדכון ידני של כל הפונקציות האלה. קוטלין פשוט חוסכת לנו כתיבה של המון קוד ומלא תחזוקה.

## בטיחות

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F206275233290027%2Fphotos%2Fa.206281073289443%2F497038737547007%2F%3Ftype%3D3&width=500" width="500" height="506" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>

אוקיי, אז כשאומרים בטיחות מתכוונים לכמה דברים. אבל הדבר המרכזי שמופיע ב*כל* המדריכים על קוטלין הוא null safety.
מכך שזה מופיע בכולם ניתן להבין שמדובר בסוגיה שכואבת מאוד לאנשי ג'אווה, וזה נכון, אבל מה זה לעזאזל?!

ובכן, כל אובייקט חייב להיות מאותחל, זאת אומרת צריך להיות לו ערך כלשהו על מנת להשתמש בו. אם לא איתחלנו אותו הערך שלו יהיה `null` שזה בעברית פשוטה 'ריק'.

בכל שלב, גם אחרי שכבר נתנו למשתנה מסויים ערך, אנחנו יכולים לרוקן אותו ולהפוך אותו ל`null`.

הבעיה היא שאם נרצה אחר כך לקרוא את הערך של המשתנה הזה ולא נבדוק קודם שהוא איננו null, ג'אווה פשוט תתפוצץ עלינו ותזרוק שגיאה והאפליקציה תקרוס. כיף חיים.

אז איך קוטלין עוזרת לי כאן?
ובכן היא לא לחלוטין מונעת את הבעיה הזאת, אבל היא הופכת אותה להרבה פחות נפוצה והרבה יותר קלה לבדיקה מוקדמת.

נראה דוגמה.
```java
Dog dog = new Dog("Boris", "Coli");
dog.getName();
//זה ידפיס את שם הכלב --Boris
dog = null;
dog.getName();
//זה יגרום לשגיאה ויקריס את המערכת --NullPointerException
```
בדוגמה הזו אנו רואים שהפעם הראשונה שאנחנו מדפיסים את השם של הכלב, הכל עובר בסדר, יש לנו אובייקט מסוג כלב, ויש לו שם.
אבל בפעם השניה, כבר אין לנו אובייקט של כלב, מי שמייצג אותו - `dog` - הוא כעת null, ג'אווה לא יודעת מה לעשות עם הפקודה שלכם ואין לה שום דרך להריץ אותה, ולכן האפליקציה מתרסקת. לא כיף.

אבל רגע, אתם עוצרים אותי. למה שבכלל נרצה להפוך משהו לnull?
אז זו שאלה מצויינת, ולמען האמת ב99 אחוז מהמקרים אנחנו ממש לא רוצים את זה. אחד מהאנשים המשפיעים ביותר בקהילת מפתחי ג'אווה ומייסד שיטת clean code מר [בוב מרטין](Check out Uncle Bob Martin (@unclebobmartin): https://twitter.com/unclebobmartin?s=09) המכונה אנקל (דוד) בוב, טוען למעשה שאתם בשום אופן, לעולם לא צריכים להחזיר אובייקט שערכו null. ואני הקטן חושב שהוא צודק לגמרי.

רק שלפעמים, בג'אווה אין לכם ממש ברירה. נגיד ואתם מגדירים משתנה בתחילת הקלאס, אבל אתם מחכים לשרת שיחזיר לכם תשובה ורק אז תמלאו את אותו משתנה בערך. בינתיים הערך של אותו משתנה יהיה null נכון? הרי אף אחד לא נתן לו ערך אחר. אם מישהו ינסה לגשת אליו בזמן הזה האפליקציה תקרוס.

מה עושים? בג'אווה בדרך כלל נעשה את הדבר הבא
```java
if(dog != null) {
    dog.getName();
}
```
במקרה הזה אנחנו נקרא לערך של הכלב, רק אם הערך של `dog` הוא שונה מnull.

זה יעבוד, ובאפליקציית ג'אווה נורמלית אתם תראו אלפי בדיקות כאלה, רק כדי לעשות בטוח שהאפליקציה הרגישה והעדינה שלנו לא תתפוצץ.

ואיך זה נראה בקוטלין?
ובכן כברירת מחדל קוטלין לא מאפשרת ליצור משתנה בלי לתת לו ערך, משתנה רגיל בקוטלין לא יכול להיות null. 
אם ננסה לכתוב משהו כזה

```kotlin
var dog: Dog
```

נקבל שגיאת קומפילציה. 
רק אם נכתוב למשתנה ערך, הקוד יתקמפל

```kotlin
var dog = Dog("silwan", "wolf")
```
אנחנו גם לא יכולים להפוך אותו אחר כך לnull בשום צורה, הקוד הבא למשל, יזרוק שגיאת קומפילציה
```kotlin
dog = null
```
אז מה אם אנחנו כן רוצים משתנה שיכול להיות null?
אם אנחנו ממש בטוחים שזה מה שאנחנו רוצים אנחנו יכולים לעשות זאת על ידי הוספת סימן שאלה לצד הtype של המשתנה. כך, במקום הקוד הבא
```kotlin
val dog: Dog
```
שלא התקמפל לנו קודם, נוכל לכתוב את הקוד הבא
```kotlin
val dog: Dog? = null
```
והפעם זה אפילו יתקמפל.

הכל טוב ויפה אבל מה יקרה אם נקרא לו לפני שהושם לו ערך? האם לא נקבל NPE?

כנראה שכן, אבל זה לא יהיה כזה קל. כדי לגשת לערך של משתנה שהוגדר כ`nullable` כלומר כזה עם הסימן שאלה, אנחנו חייבים להוסיף סימן שאלה. רגע מה? ככה

```kotlin
dog?.name
```
כך, רק אם dog אכן איננו null, הקריאה ל`name` תתבצע. 

יש עוד דרכים בהם קוטלין דואגת לבטיחות בקוד, כמו [sealed classes](“Understanding Kotlin Sealed Classes” by Josias Sena https://link.medium.com/BXAJlgqkm0), [immutability](“Effective Kotlin: Item 17 — Minimize mutability” by Matthew Dolan https://link.medium.com/WKaDStxnm0) והאהוב עלי במיוחד [named parameters](https://www.programiz.com/kotlin-programming/default-named-arguments), אבל זה מספיק לעכשיו.

### משותפת
אנחנו יודעים שאפשר לכתוב לאנדרואיד בקוטלין, זה כבר אמור היה להיות ברור עד עכשיו. 
אבל האמת היא שקוטלין יכולה לשמש אותנו להרבה יותר מזה.

אפשר להשתמש בקוטלין גם כדי לכתוב אפליקציית צד שרת, באמצעות שימוש בספריית [ktor](https://ktor.io/).

אבל זה עדיין אומר שאנחנו רצים מעל ה`JVM` שזו המכונה הוירטואלית של ג'אווה, אז זה לא כזאת חכמה.

רק שזה לא נעצר שם. אפשר להשתמש בקוטלין גם כדי לכתוב אפליקציית ווב, כלומר אתרי אינטרנט. זה נקרא [kotlin.js](https://www.raywenderlich.com/201669-web-app-with-kotlin-js-getting-started) וזה בעצם מתרגם את הקוד שלכם לקוד ג'אווה-סקריפט שיכול לרוץ על גבי כל דפדפן.

וממש לאחרונה אפשר גם לכתוב קוטלין כדי להריץ אפליקציית iOS על גבי אייפון, אייפד והשעון ההוא שמזכיר לכם כל תקתוק ששילמתם מלא כסף על שעון כי יש לו מסך מגע ומוניטור לחץ דם (ברור שהלחץ דם עלה, נזכרתם כמה כסף בזבזתם על שעון). 
האפשרות הזו נקראת [kotlin/native](https://kotlinlang.org/docs/reference/native-overview.html) והיא מתרחבת כדי לכלול גם אפליקציות לדסקטופ.

אז כן, נראה לי שבהחלט אפשר לקרוא לה שפה **משותפת**.

### נוחה על כל ide
טוב, לא יודע לגבי זה ואין לי מושג למה זה בכלל חלק מההצהרה שלהם. קוטלין רצה די טוב על Android Studio, אבל זה נכון גם לגבי כל שפה נתמכת אחרת, אז לא יודע מה הם רוצים.

{{<subscribe text="רוצים לקבל עדכון ברגע שעולה עוד פוסט על קוטלין?">}}

## נו, אז? קוטלין או ג'אווה?
טוב, אז כמו שאפשר להבין מהפוסט אני ממש אוהב את קוטלין, אני חושב שזו שפה נהדרת שגם קל ללמוד וגם קל לכתוב בה קוד טוב ויעיל.

אבל, אני חושב שהתשובה לשאלה הזו היא יותר מורכבת. **לפרוייקט חדש**? הייתי אומר רק קוטלין, גוגל כבר מקדמים את קוטלין בכל מקום, זו שפה יציבה ואין שום סיבה לא להינות מכל מה שיש לה להציע.

**לפרוייקט קיים** לעומת זאת אני חושב שצריך לבדוק התאמה. במיוחד בחברות גדולות לא תמיד בטוח שהתועלת תהיה גדולה יותר מהנזק האפשרי. אמנם כן, לא חייבים להחליף את הcode base מיד ואפשר לכתוב רק קלאסים חדשים בקוטלין (שתי השפות יודעות לחיות יחד באותו פרוייקט נהדר), אבל יש עוד כמה דברים לקחת בחשבון.

* כח אדם.

    כמה זמן יקח לכל חברי הצוות להתרגל לשפה החדשה? 
    האם כולם יכולים לכתוב (ולהבין) קוטלין ברמת הסיניוריטי שיש להם כרגע בג'אווה?
    
* שיתוף קוד.

    אמרנו שאפשר לכתוב קוטלין גם באפליקציה שכבר מבוססת ג'אווה, וזה נכון. אבל צריך לזכור שזה גם מביא איתו אתגרים. למשל null safety שדיברנו עליו קודם? עובד רק כשאנחנו כותבים רק בקוטלין, אם אנחנו פונים למשתנה ג'אווה דרך קוטלין אין לנו שום וודאות שהוא לא יהיה null ולקוטלין אין שום דרך למנוע את זה, מה שאומר שנצטרך להמשיך לבצע בדיקת nullים גם בקוטלין, וזה קצת מפספס את הנקודה, לא? 
יש עוד בעיות שיכולות לצוץ בשיתוף של קוד בין שתי השפות, למשל העובדה שבג'אווה יש פרימיטיביים ובקוטלין רק אובייקטים יכולה לפעמים לבלבל, נניח והגדרנו משתנה מסוג `Int` בקוטלין ואנחנו פונים אליו מג'אווה, אנחנו יכולים להניח בטעות שערך הדיפולט (ברירת המחדל) שלו יהיה אפס כמו בג'אווה, אבל זה לא נכון, ערך הדיפולט יהיה בכלל null. 

## מה ללמוד?
באשר לשאלה מה ללמוד למפתח חדש, אני מאמין שאין ברירה אלא ללמוד את שתיהן.

קוטלין היא ללא ספק שפת העתיד וכדאי ללמוד אותה וכמה שיותר מוקדם, מצד שני כנראה שג'אווה פה לעוד לא מעט זמן. קודם כל יש עדיין מלא ספריות הכתובות בג'אווה ונכון שאפשר להשתמש בהן בקוטלין (הרי יש שיתוף בין השפות), אבל בלי הבנה בסיסית בג'אווה יהיה קשה מאוד להבין איך בכלל אמורים להשתמש בהן.

שנית, רוב המדריכים באינטרנט עדיין כתובים בג'אווה, אם לא תדעו ג'אווה לפחות ברמה בסיסית, לא תצליחו להבין איך להשתמש בפונקציות בסיסיות של המערכת.

שלישית, ואולי החשוב ביותר, בחברות הגדולות רוב הקוד (אם לא כולו) כתוב ג'אווה, גם אם תצליחו לסנן רק חברות שבהן כותבים **היום** בקוטלין.
מה שאומר שאם תרצו להיכנס לקוד הקיים, ודאי אם תרצו לבצע בו שינויים ואפילו אם רק תרצו להמיר אותו לקוטלין, אתם חייבים לדעת ג'אווה ברמה קצת יותר מבסיסית.

הייתי מציע למפתח מתחיל ללמוד קודם ג'אווה, כדי להכיר את השפה ברמה הבסיסית, ורק אז ללמוד מדריכים לאנדרואיד בקוטלין.

זה אולי נשמע מפחיד, אבל שתי השפות לא מאוד שונות ואפשר ללמוד את שתיהן די בקלות, לפחות ברמה הבסיסית. וללמוד ג׳אווה ברמה בסיסית רק יתן לכם בסיס טוב יותר ללימוד קוטלין אחר כך.

בספר שאני כותב עכשיו, אני נותן פרוייקט אחד בג׳אווה, כדי שתהיה היכרות עם השפה, ואחר כך שאר הפרוייקטים בספר הם בקוטלין בלבד, כדי להגיע לרמת שליטה טובה בשפה.

זהו, זה השנקל שלי בעניין. אוהבות קוטלין? לא מסוגלות לזוז בלי ג'אווה? יאללה, תבעירו אש בתגובות
