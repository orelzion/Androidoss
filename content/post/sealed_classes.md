---
title: "זה לא כל כך נעים לראות גן סגור (אלא אם כן זה sealed class)"
date: 2020-03-22T20:20:08+02:00
tags: ["קוטלין"]
keyowrds: ["קוטלין", "sealed class", "enum"]
draft: true
---
<small>קרדיט תמונה</small>
<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@justinchrn?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Justin Chrn"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Justin Chrn</span></a>

זה לא כל כך נעים לראות גן סגור, שר [יהונתן גפן](https://www.youtube.com/watch?v=DnRCI8aLt_Q), וזה באמת נכון, אף אחד מאיתנו לא אוהב שאומרים לו לא, או שמגבילים אותו. 

אבל בכתיבת קוד, הרבה פעמים הדבר הכי נכון הוא דווקא להגביל. 

אחד מכללי ה[Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns) (מעקרונות התכנות באובג׳קט אוריינטד), הוא ה**open/closed princple**. העיקרון שאומר שקלאס צריך להיות פתוח ל**הרחבה** אך סגור ל**שינויים**. 

קל מאוד לממש את העיקרון הזה בכל שפת OOP (אובג׳קט אוריינטד), באמצעות שימוש נכון ב`interface` וירושות. אבל לפעמים זה לא מספיק, לפעמים אנחנו רוצים קצת יותר שליטה. ואז אנחנו צריכים להשתמש ב`sealed class` של קוטלין.

אז מה זה sealed class ומתי להשתמש בו?

## open/closed principle

כדי להבין למה להשתמש בsealed class, צריך קודם להבין את העיקרון שהזכרנו קודם ה**open/closed principle** ונעשה את זה כמו תמיד באמצעות דוגמאות.

נניח ואנחנו משרד הבריאות ואנחנו רוצים לפתח אפליקציה שמדרגת משקאות קלים לפי מידת (חוסר) הבריאות שלהם. 

אנחנו נגדיר קלאס בשם `Drink`, שיהיו בו ערכים תזונתיים שונים. אנחנו נקבע לכל ערך תזונתי סף שברגע שאותו משקה עובר אותו הוא מקבל תווית (`badge`) מסוג מסוים, אחר כך נחזיר בעבור כל משקה רשימה (שיכולה להיות ריקה) של תוויות.

<script src="https://gist.github.com/orelzion/afb3c962aafc74a527437f822ed74870.js"></script>
<script src="https://gist.github.com/orelzion/10175a7befb3b9a00a98a1b8039f9de7.js"></script>
<script src="https://gist.github.com/orelzion/c6826c71cdc2a951cd3b5b088d4df5e4.js"></script>
נהדר, נראה שיש לנו כל מה שאנחנו צריכים.

עכשיו נשאר רק לכתוב את התוכנה עצמה, אבל היא מאוד פשוטה, לא?

נכתוב פונקציה שמקבלת משקה, עוברת על רשימת הערכים התזונתיים שלו, מדרגת כל ערך תזונתי ומצמידה לו תווית.

אבל רגע, איך נדע לפי מה לדרג? אנחנו קודם צריכים פונקציה שמדרגת ערכים תזונתיים.

אז בואו נכתוב אותה.

<script src="https://gist.github.com/orelzion/9f00134c25ca0d7aa65e4d0acd31cbd3.js"></script>
אוקיי, עכשיו נשאר לנו לכתוב את הפונקציה שמקבלת את המשקה ומדביקה לו תווית.

<script src="https://gist.github.com/orelzion/348bc68004253cd5f8d5d5f8194fd068.js"></script>
מה אנחנו עושים כאן?

אנחנו רצים על כל הערכים התזונתיים של המשקה, וקוראים לפונקציה `getBadgeForNutritionLabel`, אם היא מחזירה ערך שהוא לא `null` אנחנו מוסיפים אותו לרשימה. בסופו של תהליך יש לנו רשימה בשם `badges` שאותה אנחנו משימים בערך `badges` של המשקה המקורי.

### אז מה בעצם הבעיה?

זה נראה נהדר, וזה גם יעבוד.

הנה דוגמה של הקוד שתוכלו גם להריץ

<iframe src="https://pl.kotl.in/CQ9IeTQGp"></iframe>
הבעיה הראשונה שקופצת לעין בצורה הכי ברורה היא המימוש של `NutritionLabel`, מספיק שמישהו יטעה בהכנסה של השם הנכון, למשל יכתוב sugar במקום Sugar כדי שהתוכנה לא תנפיק badge נכון. 

סטרינגים זה כמעט תמיד מתכון לצרות. מה נעשה? נהפוך את זה לenum.

