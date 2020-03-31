---
title: "אל תחזור על עצמך (זה לא היה מצחיק גם בפעם הראשונה)"
summary: "יש אימרה מפורסמת של ביל גייטס 
<br>
I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.
<br>
כשמישהו כותב קוד פעמיים הוא צריך לחשוב על דרך להפוך את זה לפעם אחת, אחרי הכל אם היית צריך להשתמש באותו קוד ביותר ממקום אחד, סיכוי טוב שתצטרך להשתמש בו בעוד מקומות, אז למה לעבוד קשה? תכתוב אותו בצורה כזו שמאפשרת לך להשתמש בו במקומות נוספים בלי לחזור על עצמך."
date: 2020-03-24T22:28:10+02:00
tags: ["עקרונות", "מתקדמים"]
draft: false
---

קרדיט תמונה 
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@cjred?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from CJ Dayrit"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">CJ Dayrit</span></a>

יש אימרה מפורסמת של ביל גייטס 

> # I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.

כשמישהו כותב קוד פעמיים הוא צריך לחשוב על דרך להפוך את זה לפעם אחת, אחרי הכל אם היית צריך להשתמש באותו קוד ביותר ממקום אחד, סיכוי טוב שתצטרך להשתמש בו בעוד מקומות, אז למה לעבוד קשה? תכתוב אותו בצורה כזו שמאפשרת לך להשתמש בו במקומות נוספים בלי לחזור על עצמך.

כשאת חוזרת על עצמך את לא רק עושה עבודה כפולה, את גם מכינה את הקרקע לבאגים. הרי הדרך היחידה לייצר באגים היא לכתוב קוד, ומכאן המסקנה המתבקשת: פחות קוד == פחות באגים.

החוק הזה נקרא Don't repeat yourself (**DRY**) והוא נוסח לראשונה על ידי [Andy Hunt](https://en.wikipedia.org/wiki/Andy_Hunt_(author)) ו[Dave Thomas](https://en.wikipedia.org/wiki/Dave_Thomas_(programmer)) בספר המאוד חשוב שלהם [The Pragmatic Programmer](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X). 

אם כי זה מאוד נכון וכולם מבינים את זה, לפעמים זה קצת קשה לשים לב לזה בפרקטיקה, כלומר כשממש כותבים קוד.

אז בואו נראה דוגמה קטנה לאיך אנחנו מקפידים לכתוב קוד שלא נצטרך להעתיק שוב ושוב.

## סוכר ברמה גבוהה

נניח וקיבלנו הצעת עבודה ממשרד הבריאות. הם רוצים שנכתוב תוכנה שממיינת משקאות קלים ומדביקה להם תווית אחת או יותר לפי הצורך.

זה לא אמור להיות קשה מדי, נכון?

בואו נכתוב משהו קטן שעושה את זה.

<script src="https://gist.github.com/orelzion/e153070f7dc56ff5041c8b1c6e915092.js"></script>
אז יש לנו קלאס למשקה `Drink`, והוא מכיל מלבד שמו גם ערך בגרמים של סוכר ומלח.

יש לנו גם פונקציה `getBadges` שמקבלת משקה ומחזירה רשימה של תוויות אותם אנחנו מדפיסים.

זה נהדר וזה עובד. אבל...

עכשיו ביקשו מאיתנו להוסיף גם ערך תזונתי של שומן.

טוב, זה אמור להיות פשוט

<script src="https://gist.github.com/orelzion/e7aba485af7f0de7f01db890c0bbb552.js"></script>
הוספנו גם שומן!

אבל שמתם לב כמה מקומות היינו צריכים לשנות בקוד?

היינו צריכים להוסיף שומן גם כמשתנה ב`Drink` וגם להוסיף אותו לפונקציה שמחזירה תוויות.

אבל למה בעצם? הפונקציה הזו עושה תמיד אותו דבר בודקת ערך תזונתי מסויים מול רף מסוים. חייבת להיות דרך להפוך את הפעולה הרפטטיבית הזאת ליותר אוטומטית.

## אובייקטים

כשאנחנו שמים לב שפונקציה מסויימת עושה את אותו דבר עבור ערכים שונים, זה אמור להוביל אותנו לשאול את השאלה האם אותם ערכים חולקים משהו משותף?

כי אם כן, אולי נכון לומר שיש להם אותו אבא.

אותו אבא זה אומר ששניהם יכולים לממש את אותו הקלאס שבו יוגדרו הערכים המשותפים שלהם.

במקרה שלנו הערכים המשותפים הם הערך התזונתי ורף תחתון לתווית.

אז בואו ניצור להם אובייקט משותף.

<script src="https://gist.github.com/orelzion/36539a1810e2405d6b6bd93e3643def7.js"></script>
הו הרבה יותר טוב!

עכשיו יהיה ממש קל להוסיף ערך תזונתי חדש. אנחנו לא צריכים לשנות כלום בקלאס `Drink`, אנחנו לא צריכים לשנות כלום בפונקציה `getBadge`, אנחנו רק צריכים להוסיף `NutritionFact` למשקה שלנו וואלה! הפונקציה כבר תבדוק אם הערך שלו למאה גרם עובר את הרף, ותדפיס תווית.

## ערכים מוגדרים מראש

אבל האם באמת אנחנו לא חוזרים על עצמנו?

בדוגמה שלנו יש לנו רק משקה אחד `Coke`. מה יקרה כשנוסיף עוד משקה?

<script src="https://gist.github.com/orelzion/8d403d52f71e2fb98185e6dfc57bb25b.js"></script>
אז הנה הוספנו חלב.

הגדרנו לו ערכי סוכר, שומן ומלח. 

האם אנחנו חוזרים על עצמנו? בואו נסתכל טוב ונראה אם אנחנו לא כותבים את אותו דבר שוב.

שמתם לב? בטח ששמתם לב. אנחנו כותבים את ערך הסף לתווית שוב ושוב.

שמתם לב ממש טוב? כי עשיתי שם טעות, כתבתי כערך הסף למלח בחלב ערך שונה ממה שכתבתי לו בקולה. 

😲 אוי ואבוי, זה ממש **באג**! 

ולמה זה קרה? כי חזרנו על עצמנו. כמו שאמרנו בתחילת הפוסט, יותר קוד == יותר באגים.

טוב, אבל לא באנו לכאן כדי להתבאס על עצמנו, מה כדאי שנעשה?

כשאנחנו יודעים מראש מה הערכים אנחנו כבר לא קוראים להם **משתנים** אנחנו קוראים להם **קבועים** או קונסטים (const).

אז איך מגדירים אובייקטים קבועים?

למעשה, אנחנו לא צריכים להגדיר את כל הערך כקבוע, מספיק שנגדיר את ערך הסף הבריאותי כקבוע.

טוב, כמה דיבורים. בואו נראה קצת קוד

<script src="https://gist.github.com/orelzion/f23ae96d953a60dc44871bda223c7d23.js"></script>

{{<subscribe text="אני אשלח לכם אימייל כשיוצא פוסט חדש, אתם לא צריכים לרפרש כל פעם, אל תחזרו על עצמכם :)">}}

## abstract class

מה קורה כאן?

הקלאס שהגדרנו קודם לייצג ערכים תזונתיים הופך מ`data class` ל`abstract class` . 

מה זה אומר? `abstract class` הוא קלאס שאי אפשר לממש. זאת אומרת שאם אכתוב

{{< highlight kotlin "linenos=table,hl_lines="  >}}
NutritionFact(12.0)
{{</ highlight>}}

אני אקבל הודעת שגיאה.

אם אי אפשר לממש אותו למה הוא טוב?

הוא טוב כדי שיהיה אפשר ל**רשת** ממנו. הוא מגדיר אובייקטים אחרים, אובייקטים ש**חולקים** ביניהם ערך(ים) משותף.

במקרה שלנו כל הערכים התזונתיים *חייבים* להכיל את משקל הערך בגרמים ואת הרף שממנו הם מוגדרים כלא בריאים.

אנחנו **אוכפים** את זה שכל מי שיורש מ`NutritionFact` יגדיר מה הרף התזונתי כבר ברמת הקונסטקטור, בכך שהקונסטקרטור של האבא `NutritionFact` מקבל את הערך הזה.

כך אנחנו מוודאים שערכים תזונתיים שונים כמו סוכר ומלח יגדירו את הרף התזונתי שלהם כבר ברגע **ההגדרה** שלהם, ולא נצטרך לסמוך על המפתח לזכור מה רצינו להגדיר. בנוסף אם נרצה פעם לשנות את הערך הזה נוכל לעשות זאת בקלות **ממקום אחד**.

בנוסף אנחנו **אוכפים** את כל היורשים לממש ערך של משקל בגרמים. את זה אנחנו עושים על ידי שהגדרנו בקלאס האבא משתנה מסוג `abstract`, כלומר משתנה שהבן **חייב** לממש.

אם קלאס מסוים, נניח `Calory` לא יממש את המשתנה `amountInGrams` אנחנו נחטוף שגיאת קומפליציה. למשל הקוד הזה

{{< highlight kotlin "linenos=table,hl_lines="  >}}
data class Calory(): NutritionFact(35.0)
{{</highlight>}}

זה קוד שיוביל לשגיאה. רק אחרי שנממש את המשתנה האבסרקטי הקלאס שלנו יהיה ולידי.

את עניין השם פתרנו בצורה פשוטה יחסית, `NutritionFact` מממש ערך דיפולטי (משותף לכל היורשים) שלוקח את השם של הקלאס ומחזיר אותו. אפשר כמובן לעשות זאת בדרך אחרת, איך שאתם בוחרים.

ושימו לב כמה קל עכשיו להגדיר משקאות. אנחנו לא סתם מוסיפים ערך תזונתי, אנחנו מוסיפים ערך תזונתי שאנחנו יודעים בדיוק מהו, ואנחנו ממש לא צריכים לדאוג לגבי הגדרת הרף, או שמות או כל דבר **משותף** אחר.

## לסיום

ראינו מה הערך של **DRY**, הבנו כמה זה רע שיש לנו דופליקציות בקוד.

למדנו גם איך ליצור אבסטרקציה לקלאס שלנו כדי לא לחזור על עצמנו שוב ושוב.

לצערי הרב, זה ממש לא מספיק. כדי לממש **DRY** באמת אנחנו צריכים לעקוב אחרי כללי ה**SOLID**.

ועל זה, בעז״ה בפוסט הבא.