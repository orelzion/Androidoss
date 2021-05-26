---
title: "ConstraintLayout Flow - לבנות UI מורכב [וידאו]"
summary: "אחד הדברים שאני הכי אוהב בפיתוח היא היכולת לממש UI, לראות עיצוב יפה ולתת לו ביטוי אמיתי.

אבל לא תמיד זה קל לעצב UI באנדרואיד, במיוחד אם רוצים לעשות זאת באופן יעיל כדי שהממשק יהיה לא רק יפה אלא גם מהיר.

היום נראה שני דרכים לעצב את הUI הבא, במבט ראשון זה לא נראה מורכב, נכון? אבל תתפלאו כמה דרכים אפשריות יש כדי להגיע לתוצאה הרצויה, וכשזה מגיע לUI באנדרואיד - יש את הדרך הקלה, יש את הדרך היעילה ואם מחפשים ממש טוב יש את הדרך שהיא גם קלה וגם יעילה."
date: 2021-05-07T17:55:37+03:00
tags: ["ui", "מדריכים"]
keywords: ["android ui", "ConstraintLayout", "android layouts"]
draft: false
---

Photo by <a href="https://stocksnap.io/author/michaelgaida">MichaelGaida</a> from <a href="https://stocksnap.io">StockSnap</a>

זהו המדריך הראשון שאני כותב שצירפתי אליו גם וידאו, ההסבר בוידאו מלא יותר ואני ממליץ לצפות בו. אבל למי שמעוניין בטקטס בלבד, צירפתי פה הסבר תמציתי.

{{< youtube scOOeirAFa0 >}}


## הקדמה

אחד הדברים שאני הכי אוהב בפיתוח היא היכולת לממש UI, לראות עיצוב יפה ולתת לו ביטוי אמיתי.

אבל לא תמיד זה קל לעצב UI באנדרואיד, במיוחד אם רוצים לעשות זאת באופן יעיל כדי שהממשק יהיה לא רק יפה אלא גם מהיר.

היום נראה שני דרכים לעצב את הUI הבא, במבט ראשון זה לא נראה מורכב, נכון? אבל תתפלאו כמה דרכים אפשריות יש כדי להגיע לתוצאה הרצויה, וכשזה מגיע לUI באנדרואיד - יש את הדרך הקלה, יש את הדרך היעילה ואם מחפשים ממש טוב יש את הדרך שהיא גם קלה וגם יעילה.

![dribble form design](https://cdn.dribbble.com/users/4712412/screenshots/14668396/media/870e6fa35e316cfc616c31e213864c8b.png?compress=1&resize=1600x1200)

## LinearLayout

אז הדרך הראשונה שאני רוצה להראות לכם ממש זריז, היא להשתמש בLinearLayout, אני לא אעבור פה על כל התהליך ורק אראה לכם את הקוד שכבר כתבתי. 

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Forelzion%2FConstraintLayoutFlow%2Fblob%2Fb171ea19ec21019c8995c53824adbc32f7099720%2Fapp%2Fsrc%2Fmain%2Fres%2Flayout%2Factivity_main.xml&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>

כמו שאפשר לראות חילקתי את המסך לכמה layoutים שונים. יש לי את הLinearLayout הראשי, בתוכו יש LinearLayout שמחזיק את הheader. 

מתחתיו אנחנו רואים את הkeypad, הוא מורכב מ4 LinearLayout, שמחזיקים כל אחד את הכפתורים השונים מ1 ועד ל0 ואת כפתור המחיקה.

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Forelzion%2FConstraintLayoutFlow%2Fblob%2Fb171ea19ec21019c8995c53824adbc32f7099720%2Fapp%2Fsrc%2Fmain%2Fres%2Flayout%2Fkeypad_layout.xml&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>

בתחתית המסך יש לנו LinearLayout נוסף שמחזיק את הכפתור ומידע משפטי.

זה נראה טוב וזה עובד. כדי להשיג את זה השתמשתי הרבה בתכונה של LinearLayout שנקראת weights. 

בגדול זה אומר שאני קובע כמה ״משקל״ תופסת כל קומפוננטה בתוך הLayout. 

זה מה שמאפשר לי לחלק כל שורה לשלושה חלקים שווים, גם בשורה התחתונה שכוללת למעשה רק שני כפתורים.

וזה גם מה שמאפשר לי לחלק בצורה דינמית את הLayout בין שלושת החלקים, הheader הkeypad והbottom.


### מה הבעיה עם זה?

אוקיי, אז זה נראה טוב וזה עובד, למה לשנות?

שאלה מצויינת. 	

משתי סיבות. 

1. אנחנו מעדיפים להשתמש בכמה שפחות layouts. כל layout צריך למדוד את עצמו במסך כדי לדעת איך לצייר את עצמו ואת הviews שבתוכו. מה שאומר שאם יש לנו layout בתוך layout או בעגה המקצועית nested layouts, אנחנו מעמיסים חישוביות על המערכת.
    אבל בסדר, כדי שזה באמת ישפיע על ביצועים רמת הnesting צריכה להיות מאוד גבוהה, הדעות חלוקות אבל משהו בין 7 ל12. צריך כמובן לקחת בחשבון שהactivity שלנו בעצמה נחה בתוך Layout (ואם אנחנו משתמשים בtheme שהוא לא NoActionBar, אז אפילו בעוד Layout), כך שאנחנו תמיד מתחילים עם לפחות רמה אחת או 2 של nesting, אבל עדיין לא מדובר באסון.
2. הבעיה השניה היא הבלאגן, nesting יוצר בלאגן, במיוחד בxml שלא כל כך קל לזהות מה נמצא איפה. ככל שההיררכיה שלנו שטוחה יותר, כך הקידוד שלנו יהיה בטוח יותר שלא לדבר על יעיל יותר.


## ConstraintLayout

כדי לפתור את בעיית הnesting גוגל פיתחה layout חדש. `ConstraintLayout`. 

בconstraint אנחנו לא שופכים views פנימה לתוך הlayout ונתונים למערכת לסדר אותם, אלא אנחנו קובעים את היחסים הconstraints בין הviews השונים.

הדבר הזה מאפשר לנו ליצור ממשקים מורכבים בלי שנצטרך לחבר כמה layouts יחד. 

ככה זה נראה.

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Forelzion%2FConstraintLayoutFlow%2Fblob%2F10230697c3d057e29847bbd6bd5e4e41dcec2453%2Fapp%2Fsrc%2Fmain%2Fres%2Flayout%2Factivity_main.xml&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>

כמו שאפשר לראות, אין לנו שום nesting, כלום. הכל נמצא בתוך layout אחד.

כדי להשיג את זה אנחנו צריכים להגדיר את היחסים בין הviews השונים בתוך הlayout.

אבל מה שעובד נהדר בשביל הheader והbottom שלנו, יכול להיות מאוד מעייף ומסובך בשביל הkeypad שלנו.

אנחנו לא רוצים להגדיר את היחסים בין כל אחד מהכפתורים שמרכיבים את הkeypad.

החדשות הטובות? אנחנו לא צריכים!

## Flow
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2Forelzion%2FConstraintLayoutFlow%2Fblob%2F10230697c3d057e29847bbd6bd5e4e41dcec2453%2Fapp%2Fsrc%2Fmain%2Fres%2Flayout%2Fkeypad_layout.xml&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>

כמו שאפשר לראות בקוד, אין לנו יחסים בין הכפתורים השונים.

כדי למקם אותם בתוך הlayout, אנחנו משתמשים בflow.

ל`flow` אנחנו מעבירים את ה`id` של כל אחד מהviews שאנחנו רוצים שהוא ינהל, ואז הוא פשוט מצמיד אותם אחד לשני.

בהמשך אנחנו מבקשים ממנו להגביל את מספר הviews בשורה ל3 כפי שיש לנו בעיצוב.

## Space 
בשורה האחרונה יש לנו רק שתי כפתורים, אבל אנחנו עדיין רוצים לשמר שם מקום של כפתור שלישי, לא כי באמת יהיה שם כפתור אלא רק כדי ששתי הכפתורים יקבל כל אחד רק את שליש המסך ולא יחלקו ביניהם חצי-חצי.

כמובן שאנחנו לא רוצים להוסיף לשם כפתור באמת, ובדיוק בשביל זה יש את `space`.

כשאנחנו משתמשים ב`space` אנחנו בעצם מבקשים מה`ConstraintLayout` להניח שיש כאן view שלא צריכים לצייר אותו.

וכף מבחינת flow יש כאן בעצם 3 views שצריכים לחלוק את השורה, ושתי הכפתורים שלנו יהיו באותו גודל כמו חבריהם מהשורות העליונות.