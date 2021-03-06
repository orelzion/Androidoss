---
title: "התקנת אנדרואיד סטודיו - מדריך בתמונות"
summary: "כדי לתכנת לאנדרואיד צריך להתקין את אנדרואיד סטודיו. זו התוכנה שאיתה אנחנו בונים, מעצבים ובודקים אפלקיציות לאנדרואיד. כמו כל תוכנה שמכבדת את עצמה היא מלאה באפשרויות ולפעמים יכולה להיות מאוד מאתגרת ומבלבלת. בפוסט הזה נלמד את עיקרי הדברים שצריכים לדעת כדי להכיר את התוכנה לפני שנצלול עמוק יותר אל תוך כל חלון"
date: 2020-02-21T16:44:07+02:00
tags: ["מתחילים", "מדריכים"]
draft: false
---

כדי לתכנת לאנדרואיד, צריכים להתקין את התוכנה **Android Studio**. 

אנדרואיד סטודיו הוא ה`ide` של אנדרואיד. מה זה ide? סביבת עבודה משולבת.

מה זה אומר? בגדול זה אומר תוכנה שבה אתם יכולים גם לכתוב את הקוד של האפליקציה שלכם, גם לעצב לה את המסכים, לשמור את הקבצים שנדרשים בשבילה (כמו תמונות, צלילים, פונטים שונים) וכמובן להריץ על מכשיר או אמולטור (תוכנה שמדמה מכשיר אמיתי) כדי שתוכלו לבדוק איך האפליקציה נראית וגם *לדבג* אותה אם ישנה בעיה. 

אז איך מתקינים את אנדרואיד סטודיו ומתחילים לעבוד איתה? בואו נראה.

## הורדה 

טוב קודם כל אנחנו צריכים להוריד את התוכנה.

נלך ל[אתר של אנדרואיד סטודיו](https://developer.android.com/studio) ונלחץ על כפתור ה`Download` הירוק הגדול. 

![android_studio_install](/content_images/android_studio_install.png)

בדרך כלל הוא אמור לזהות את מערכת ההפעלה שלכם ולהוריד לכם את הקובץ הנכון, אם אתם חושבים שהוא טעה בזיהוי, לחצו `Download Options` ובחרו בקובץ ההורדה המתאים למערכת ההפעלה שלכם.

## התקנה

### התקנה על וינדוס

לחצו פעמיים על קובץ ה `.exe` שהורדתם, ופשוט לחצו next עד לסיום ההתקנה. 

גוגל אפילו יצרו סרטון קצר שמראה איך זה נראה

<video controls="" poster="https://developer.android.com/studio/images/thumbnail-studio-install-windows.jpg" width="320">
  <source src="https://developer.android.com/studio/videos/studio-install-windows.mp4" type="video/mp4">
</video>

### התקנה על מק

לחצו פעמיים על קובץ ה`.dmg` שהורדתם. גררו את האייקון של אנדרואיד סטודיו אל תיקיית ה`Applications`, כעת לחצו פעמיים על אייקון האנדרואיד סטודיו.

עכשיו פשוט לחצו next עד סיום ההתקנה.

וכמובן שיש סרטון

<video controls="" poster="https://developer.android.com/studio/images/thumbnail-studio-install-mac.jpg" width="320">
  <source src="https://developer.android.com/studio/videos/studio-install-mac.mp4" type="video/mp4">
</video>

### לינוקס

אם יש לכם לינוקס אז אתם כנראה לא צריכים אותי כדי להסביר לכם איך להתקין אנדרואיד סטודיו.

אם אתם בכל זאת מתעקשים, הנה [המדריך](https://developer.android.com/studio/install.html#linux) של גוגל.

## פתיחה

![android_studio_launch](/content_images/android_studio_launch.png)

מסך הפתיחה של אנדרואיד סטודיו מחולק לשניים. 

משמאל יופיעו לנו פרוייקטים שכבר פתחנו בעבר, לחיצה על אחד מהם תפתח אותו לעבודה. ומימין רשימה של פעולות שאנו יכולים לעשות כדי להתחיל לעבוד על פרוייקט.

## יצירת פרוייקט חדש

כדי להתחיל פרוייקט חדש, נלחץ על **Start a new Android Studio project**

![android_studio_new](/content_images/android_studio_new.png)

נבחר ב**Empty Activity** ונלחץ Next.

![android_studio_new_project_properties](/content_images/android_studio_new_project_properties.png)

כעת נתבקש להכניס פרטים על הפרוייקט שאנחנו יוצרים.

דבר ראשון וחשוב הוא לתת שם לפרוייקט שלנו, השם חייב להיות באנגלית אבל הוא לא בהכרח חייב להיות השם שיופיע למשתמש (אפשר לשנות את השם שיופיע למשתמש אחר כך).

הכניסו את השם שבחרתם בשורה **name**.

שימו לב שברגע שאתם משנים את השם עוד שתי שדות משתנים. 

השדה של **package name** והשדה של **save location**. 

ה**save location** זה השם והמיקום של התיקייה שבה יישמר הפרוייקט שלכם.

אבל מה זה **package name**? 

בג׳אווה, זה אומר משהו כמו התיקייה הראשית של הפרוייקט שלכם. מקובל לתת שם שמוביל לאתר שלכם, כאשר החלקים של ה`url` מופרדים באמצעות נקודה וכתובים בסדר הפוך.

במקרה שלי כתבתי `com.github.orelzion`. שזה למעשה קישור לאתר הגיטהאב שלי https://github.com/orelzion 

אוקיי, אחר כך אנחנו נדרשים לבחור שפה. לאנדרואיד אנחנו יכולים לכתוב באמצעות java או kotlin, אם אתם לא יודעים במה לבחור אולי כדאי שתקראו קודם [את זה](/post/java_or_kotlin).

אחרי שבחרנו שפה אנחנו מדרשים לבחור מה תהיה גרסת האנדרואיד הישנה ביותר שבה האפליקציה שלנו יכולה לתמוך.

זאת אומרת שרק משתמשים שיש להם את גרסת מערכת ההפעלה הזו או חדשה ממנה, יוכלו להשתמש באפליקציה שלנו.

תהיו חכמים בבחירה הזו, אם תבחרו לתמוך גם בגרסאות מאוד ישנות, זה אומר שתצטרכו לבדוק הרבה יותר גרסאות בכל פעם, וזה גם אומר שתצטרכו להוסיף הרבה תמיכה בקוד לגרסאות שעבר זמנם, או לא להיות מסוגלים להשתמש בקוד חדש יותק שנתמך רק מגרסה חדשה יותר.

מצד שני, אם תבחרו לתמוך רק בגרסה הכי חדשה, מספר המשתמשים שלכם יקטן מאוד, כי לא לכולם יש את הגרסה הכי חדשה של אנדרואיד.

מה כדאי לבחור? אנדרואיד סטודיו בוחר לנו גרסה כברירת מחדל שהיא לדעתו הגרסה שכדאי לכם לבחור, וגם מראה לנו כמה משתמשים פוטנציאלים יהיו לנו אם נבחר דווקא בה.

כרגע, אנחנו פשוט נלך עם זה ולא נשנה כלום. אבל אם אנחנו מפתחים משהו שאנחנו לא מתכוונים להוציא לחנות, רק בשבילנו לצרכי לימוד, כנראה שכן יהיה לנו לבחור בגרסה החדשה ביותר כי זמן הבניה של האפליקציה יהיה קצר יותר.

זהו, חלאס לחפור, תלחצו **finish** ובואו נתקדם הלאה.

## project overview

![android_studio_project_overview](/content_images/android_studio_project_overview.png)

זהו המסך הראש והעיקרי של אנדרואיד סטודיו. כיאה לתוכנה כל כך מורכבת הוא מלא בפרטים, אייקונים, טקסטים, תפריטים ובלאגן כללי. 

אז בואו נעבור על הדברים החשובים כדי שיהיה לנו קל להבין מה אנחנו רואים.

קודם כל בואו נסתכל על הפינה הימנית התחתונה, רואים שם את אנימציית הטעינה? זה אומר שאנדרואיד סטודיו עושה משהו ברקע, בדרך כלל זה יהיה לטעון את הפרוייקט או להריץ את האפליקציה.

![android_studio_loading](/content_images/android_studio_loading.png)

אם נלחץ על זה, נוכל לראות את רשימת הפעולות שרצות ברקע.

בדרך כלל, נעדיף להמתין ולא לעשות כלום עד שזה ייגמר.

נגמר? יופי. בואו נראה מאילו חלקים עיקריים מורכב המסך העיקרי של התוכנה.

![android_studio_project_overview-2](/content_images/android_studio_project_overview-2.png)

### קוד

בחלק הזה, אנחנו כותבים את הקוד שלנו. הוא מורכב מטאבים שאנחנו יכולים לעבור ביניהם. כל טאב מייצג קובץ פתוח. הקובץ שאנחנו עובדים עליו עכשיו מודגש.

ליד שם הקובץ מופיע גם אייקון שמלמד מה התוכן של הקובץ. קבצי xml יכילו אייקון עם המילה xml, וקבצי קוד יכילו או `c` שזה `class` או `i` שזה `interface` או `e` שזה `enum`.  אם אילו קבצי קוטלין סמל ה`k` של קוטלין יופיע גם הוא.

מקש ימני על אחד הטאבים וייפתח לנו תפריט אפשרויות. האפשרויות השימושיות ביותר הן סגירת טאבים לימין, לשמאל, הכל חוץ מהנוכחי ואפילו סגירת טאבים שלא נעשו בהם שינויים (לפי [גיט](/post/git_1)).

### קבצים

כל קבצי הפרוייקט. כברירת מחדל מסודרים לפי סוג. 

`manifests` אלו קבצי `AndroidManifest.xml`של הפרוייקט (קובץ קונפיגורציות בסיסי של האפליקציה ושמות האקטיביטיס).

`java` אלו קבצי הקוד (גם קבצי קוטלין נמצאים בתיקייה הזאת).

`java generated` קבצים שנוצרו על ידי הקומפיילר, כמו למשל קובץ ה`BuildConfig`.

וכמובן `res` תיקיית הresources, מכילה את קבצי הטקסט, התמונות והדומה.

מתחת לזה יש לנו `Gradle Scripts` - והיא מכילה את קבצי ה`gradle` - כלי הבנייה של פרוייקטים באנדרואיד סטודיו. 

הסדר הזה הוא וירטואלי, אם נפתח את הקבצים בסייר הקבצים של המחשב שלנו, הם יופיעו בסדר אחר. אנדרואיד סטודיו מסדר אותם לפי סוג כדי שיהיה לנו נוח.

אם נרצה את הסדר האמיתי שלהם, נוכל ללחוץ למעלה על הAndroid עם החץ הקטן ולבחור **Project**, כך הם יופיעו באותו סדר שהם מופיעים בסייר הקבצים.

{{<subscribe text="לבנות ידע בפיתוח זו משימה שדורשת התמדה, אל תפספסו את הפוסט הבא!">}}

### מידע

מתחת לשני החלקים האלה, מופיע המידע. הוא כולל די הרבה חלונות שימושיים. 

**Build** - הודעות הקשורות לבניית האפליקציה. אם יש לנו שגיאות קומפילציה או סנכרון הם יופיעו כאן.

**Logcat** אולי חברו הטוב ביותר של מפתח האנדרואיד. החלון שמראה לנו לוגים מהאפליקציה שלנו. בין אם אלו לוגים של המערכת, או לוגים שאנחנו שמנו באפליקציה כדי לעזור לנו לזהות באגים.

**TODO** בכל פעם שנשים הערה ונכתוב בה TODO בקוד שלנו, ההערה הזאת תופיע בטאב הזה. זה שימושי מאוד אם אנחנו כותבים משהו שאנחנו לא רוצים שיישאר בקוד הסופי, למשל קוד שמיועד רק כדי לנפות באגים, או קוד שמיועד רק להדגים משהו.

**Version Control** זהו בעצם הטאב של גיט באנדרואיד סטודיו. בהמשך (אולי אפילו בפוסט הבא) אני ארחיב על הנושא הזה.

אחרי שנריץ את האפליקציה, יופיעו לנו עוד שני טאבים. 

**Run** אין פה יותר מדי מה לראות, סתם עדכונים על כך שהאפליקציה מותקנת על המכשיר ושהיא רצה.

**Debug** לדבג קוד, זה אומר לעבור יחד עם הקומפיילר שורה אחרי שורה בזמן הexecution של הקוד - כלומר בזמן הריצה. בטאב הזה יופיעו לנו הכפתורים שבהם נוכל להשתמש כדי לדבג את הקוד שלנו, כמו גם שמות ותכולה של משתנים בקוד ועוד.

## בניה והרצה

![android_studio_run](/content_images/android_studio_run.png)

משמאל לימין.

הדרופ דאון הראשון שנראה משמאל, הוא איזה מודול אנחנו רוצים להריץ. כברירת מחדל זה מסומן על האפליקציה שלנו, אבל נראה בהמשך שאפשר להריץ גם דברים אחרים (למשל טסטים, או deep link).

אחריו יופיע כפתור בחירת ה**target**, או על מה אנחנו רוצים שהאפליקציה תרוץ. זה יכול להיות אמולטור או מכשיר אמיתי.

כפתור ה**play** הוא כפתור ההרצה שלנו, לחיצה עליו תגרום לאפליקציה להיבנות, להיות מותקנת על המכשיר ולהיפתח עליו.

נקפוץ קצת ימינה ונראה את הכפתור שנראה כמו חיפושית. זהו כפתור ה**debug**. לחיצה עליו תעשה את אותו דבר כמו ה**play** רק שעכשיו היא תחבר אותו גם לdebugger כדי שנוכל לבחון את הקוד תוך כדי הריצה.

עוד קצת ימינה, ויש לנו כפתור בצורה של פיל וחץ למטה. זה כפתור ה**gradle sync** והוא מסנכרן את קבצי הבניה של האפליקציה, נשתמש בו אם למשל הוספנו ספריה או שינינו את מספר הגרסה.

## עד כאן להיום

זהו להיום. זה היה מדריך מזורז לאנדרואיד סטודיו.

בפעמים הבאות נחפור קצת יותר פנימה לכל אחד מהמושגים שהצגנו כאן. ננסה להבין את המבנה של האפליקציה ומה התפקיד של הקבצים השונים.

עד אז, כתבו לי בתגובות איך היה ומה עוד אתם רוצים לקרוא.