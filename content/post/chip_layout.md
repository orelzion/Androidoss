---
title: "Chip Layout - ממשק מורכב שהוא גם דינמי [וידאו]"
summary: "בסרטון הקודם ראינו איך להשתמש ב ConstraintLayout ובFlow כדי ליצור views מורכבים בצורה פשוטה.
הפעם נראה איך לעשות את זה מתוך הקוד.
לא תמיד יהיו לנו views מוגדרים מראש, הרבה פעמים אנחנו נצטרך להוסיף views באופן דינמי, ולצורך כך אנחנו נצטרך להתעסק עם קוד.
אז איך עושים את זה? בואו לראות."
date: 2021-05-23T22:23:58+03:00
tags: ["ui", "מדריכים"]
keywords: ["android ui", "ConstraintLayout", "android layouts", "chip", "chip-group", "regex"]
draft: false
---

Photo by <a href="https://unsplash.com/@picoftasty?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mae Mu</a> on <a href="https://unsplash.com/s/photos/cookie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

זהו סרטון שני בסדרה, אני ממליץ לצפות בסרטון עצמו, אבל לטובת מי שמעדיפה טקסט, מצורף פה גם הסבר תמציתי.

{{< youtube l1ov5v3sRP8 >}}

<br>
<br>

## הקדמה
בסרטון הקודם ראינו איך להשתמש ב ConstraintLayout ובFlow כדי ליצור views מורכבים בצורה פשוטה.
הפעם נראה איך לעשות את זה מתוך הקוד.
לא תמיד יהיו לנו views מוגדרים מראש, הרבה פעמים אנחנו נצטרך להוסיף views באופן דינמי, ולצורך כך אנחנו נצטרך להתעסק עם קוד.

אז איך עושים את זה? בואו לראות.

## מה אנחנו רוצים לעשות?
קיבלנו דרישה, מבקשים מאיתנו ליצור ממשק לכתובות מייל כמו בג׳ימייל.
כזה שמכניסים כתובת מייל, לוחצים על פסיק והוא מוסיף אותה למין כזו בועה, ואפשר להמשיך לכתוב ולהכניס כתובת אחרת.

אז מה אנחנו צריכים?
אנחנו צריכים כמובן `EditText` כדי שנוכל לכתוב את המיילים. 
ואנחנו צריכים `flow` כדי שנוכל לדחוף לתוכו את הבועות.
אה, ואנחנו צריכים גם בועות.

אז עם החלק האחרון די קל להסתדר, ספריית `material design` מבית גוגל מספקת לנו אפשרות ליצור בועות כאלה. זה נקרא [chip](https://material.io/components/chips) וזה מאוד פשוט ליצור כאלה.

ואנחנו גם כבר יודעים איך להכניס views לתוך flow כדי שהם יסתדרו יפה באופן אוטומטי, נכון? נכון.
רק שהפעם אני לא יודע מראש כמה צ׳יפים כאלה יהיו לי. אני צריך גם ליצור אותם באופו דינמי מתוך הקוד, וגם להכניס אותם ל`ConstraintLayout` באופן דינמי, וגם לקנפג אותם בתוך ה`flow`, ובכן כבר הבנתם, באופן דינמי.

איך אני עושה את כל זה?

אז קודם כל בואו נגדיר את הlayout.

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Forelzion%2FChipLayoutFlow%2Fblob%2Fmaster%2Fapp%2Fsrc%2Fmain%2Fres%2Flayout%2Factivity_main.xml&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>

אחרי שיצרנו את ה`layout` בואו נכתוב קצת קוד!

## View Binding
כדי שיהיה לי קל יותר לעבוד עם הviews השונים בתוך הlayout אני אוהב להשתמש ב[View Binding](https://developer.android.com/topic/libraries/view-binding).

**View Binding** היא ספרייה של גוגל שמייצרת לנו אובייקט שכולל בתוכו הפניות לכל הviews שנמצאים בlayout שלנו.
מיד נראה איך זה נראה, אבל קודם אנחנו צריכים לאפשר אותה.

נלך לקובץ ה`build.gralde` שנמצא בתיקיית האפליקציה שלנו. שימו לב! מדובר בקובץ של הapp לא של הproject.

תחת `android` נוסיף את השורות הבאות.

```java
buildFeatures {
    viewBinding true
}
```

עכשיו נלך ל`MainActivity.kt` ונשנה שם את הדרך שבה אנחנו עושים inflate לview.

אם בדרך כלל מה שנראה הוא
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    setContentView(R.layout.activty_main)
}
```

כל מה שאנחנו צריכים לעשות הוא לשנות את זה לקוד הבא.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val viewBinding = ActivityMainBinding.inflate(layoutInflater)
    setContentView(viewBinding.root)
}
```

`ActivityMainBinding` הוא אובייקט שהספרייה יצרה בשבילנו. השם שלו יהיה תמיד שם ה`layout` עם הסיומת Binding.

ו`root` זה הview של הlayout שלנו, במקרה שלנו `ConstraintLayout`.

## לקבל טקסט מהמשתמש
הדבר הבא שאנחנו רוצים לעשות הוא להקשיב לשינויים ב`EditText`.
אנחנו רוצים לקבל הודעה כל פעם שהיוזר הכניס אות חדשה ל`EditText`, ברגע שנזהה שהוא כתב פסיק, נדע שאנחנו צריכים ליצור Chip חדש.

ניצור פונקציה חדשה, נקרא לה `configureView` ונעביר לה את אובייקט ה`binding` שלנו.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val viewBinding = ActivityMainBinding.inflate(layoutInflater)
    setContentView(viewBinding.root)

    configureView(viewBinding)
}

private fun configureView(viewBinding: ActivityMainBinding) {

}
```

ועכשיו נוסיף `TextChangeListener`.

```kotlin
private fun configureView(viewBinding: ActivityMainBinding) {
    viewBinding.emailInput.doOnTextChanged { text, start, before, count ->
        text?.let { afterTextChanged(viewBinding, text.toString()) }
    }
}
```

אנחנו בעצם מאזינים לטקסט שהיוזר מקליד, וכשיש טקסט (כלומר הוא לא `null`), אנחנו מעבירים את הטקסט הלאה, לפונקציה שתבדוק אם יש שם פסיק ותיצור לנו chip חדש.

```kotlin
private fun afterTextChanged(viewBinding: ActivityMainBinding, text: String) {
    if (text.length > 1 && text.endsWith(",")) {
        val emailInput = text.substringBeforeLast(",")
        viewBinding.emailInput.text = null
    }
}
```

דבר ראשון אנחנו בודקים שהטקסט מכיל יותר מתו אחד, ואז אנחנו בודקים אם התו האחרון הוא פסיק. אם כן, אנחנו מחלצים מתוכו את האימייל. ואז אנחנו מוחקים את הinput הנוכחי מה`EditText`.

עכשיו אנחנו ניצור את הchip. ובשביל זה כמובן נכתוב פונקציה.

```kotlin
private fun createChip(withText: String): Chip {
    return Chip(this).apply {
        text = withText
        id = ViewCompat.generateViewId()
    }
}
```
חשוב מאוד ליצור ID, כדי שנוכל אחר כך להעביר את הID שנוצר לflow.

בפונקציה המקורית שלנו, נעביר את הטקסט ל`createChip`.
```kotlin
val chip = createChip(withText = emailInput)
viewBinding.root.addView(chip)
```

ונוסיף את הchip שיצרנו לlayout.

אם נריץ עכשיו, אנחנו נראה שזה עובד, אבל הchip סתם מונח לו בצד השמאלי של המסך.
אנחנו רוצים אותו מסודר יפה לפני ה`EditText` ובשביל זה אנחנו צריכים להוסיף אותו גם לflow.

אבל אם פשוט נוסיף אותו לרשימת ה `referencedIds` של flow הוא יופיע **אחרי** ה`EditText` וזה לא מה שאנחנו רוצים.

אנחנו צריכים ליצור העתק של ה`referencedIds` הנוכחי, ולהכניס לתוכו את הid החדש בתור אחד לפני האחרון.
ככה עושים את זה.
```kotlin
val updatedArray = viewBinding.mailsLayout.referencedIds.run {
        this
        .toMutableList()
        .apply {
            add(this.size - 1, chip.id)
        }.toIntArray()
}
viewBinding.mailsLayout.referencedIds = updatedArray
```

{{<subscribe text="כיף להכניס אימיילים? בואו תכניסו גם אחד פה 😃">}}

## Regex
הדבר האחרון שהייתי רוצה לסדר פה הוא ולידציה.
נכון לעכשיו אני יכול להכניס כל דבר לפני הפסיק, אפילו סתם מספרים, ואפילו עוד פסיק (מה שייצור לי chip ריק).

אני רוצה לוודא שמה שהיוזר מכניס הוא באמת אימייל. לצורך כך אני משתמש בregex.

rexeg היא כמו שפה קצת מסובכת, שהשימוש העיקרי שלה הוא ולידציות. היא בנויה משורה של סימנים שעיקרם התאמות שונות של טקסטים.

לשמחתנו לא צריך להבין בזה יותר מדי, והאתר [emailregex.com](https://emailregex.com/) מספק לנו regex מוכן לבדיקת תקינות אימייל.

אז בואו ניכנס לשם, נעתיק את הregex ונשים אותו כconst אצלנו בקוד.

{{< highlight java "linenos=table,hl_lines=">}}
companion object {
    private const val EMAIL_REGEX = "(?:[a-z0-9!#\$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#\$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
}
{{</highlight>}}

עכשיו נוסיף את הבדיקה לפני שאנחנו יוצרים את הchip.

```kotlin
if(!emailInput.matches(EMAIL_REGEX.toRegex())) {
    Toast.makeText(this, R.string.email_input_error, Toast.LENGTH_SHORT).show()
    return
}
```

וזהו! עכשיו אנחנו בטוחים שאנחנו מכניסים רק אימיילים אמיתיים.

## סיכום
אז בגדול זה הכל, אתם יכולים לראות את הקוד המלא אצלי בגיטהאב.
https://github.com/orelzion/ChipLayoutFlow

אה, אבל יש משהו קטן אחד. מחיקה. לא הראיתי איך למחוק chip מהרשימה שלנו.
ואני ממש אשמח אם תנסו בעצמכם, ותכתבו לי כאן בתגובות איך הלך.

נתראה בפעם הבאה!