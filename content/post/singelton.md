---
title: "סינגלטון - כשלהיות יחיד זה מיוחד"
date: 2019-10-14T20:58:43+03:00
tags: ["design patterns"]
keywords: ["קוטלין", "סינגלטון", "design patterns"]
draft: false
---

![singleton](/singelton.jpg)

סינגלטון הוא אחד מהדיזיין פטרנס (תבניות קוד לפתרון בעיות נפוצות) הנפוצים ביותר בג׳אווה ואולי בכלל.

הוא מאפשר לנו ליצור קלאסים ״מנהלים״ שהם מקור אמת אחד, אמין ונגיש מכל קלאס ומכל ת׳רד. והוא שימושי במיוחד באנדרואיד, כסביבה מרובת תהליכים מקבילים. הוא כל כך נפוץ ואלמנטרי ולכן כמובן הוא גם מקור לא אכזב של קרבות מפתחים, איך בדיוק לכתוב סינגלטון ומתי ואפילו האם בכלל הוא דיזיין פטרן או דווקא אנטי פטרן.

בפוסט הזה ננסה ללמוד למה בכלל אנחנו צריכים סינגלטון, איך לכתוב סינגלטון קלאס וכמובן איך עושים את זה בשורה אחת בקוטלין 😉

## למה אנחנו צריכים סינגלטון?

באובג׳קט אוריינטד אנחנו יוצרים אובייקטים, יש לנו קלאס שמגדיר לנו מה האובייקט יכיל, אנחנו מאתחלים את האובייקט ומשתמשים בו מאותו רגע. 

שני אובייקטים מאותו קלאס לא חולקים ביניהם מידע, כל אחד מהם שומר את המידע שלו אצלו, ולמעשה אין לאף אחד מהם מושג שהשני בכלל קיים.

זה כמובן בכלל לא מובן, אז בואו ניתן דוגמה:

{{< highlight java "linenos=table"  >}}

//Fruit.java

class Fruit {
  private int color;
  private String name;

  public Fruit(int color, String name) {
    this.color = color;
    this.name = name;
  }

  public int getColor() {
    return color;
  }

  public String getName() {
    return name;
  }
}

//FruitStorageManager.java

class FruitStorageManager {
  private List<Fruit> fruitsInStorage;

  public FruitStorageManager() {
    fruitsInStorage = new ArrayList<>();
  }

  public void addUniqueFruitToStorage(String name, int color) {
		boolean noSameFruitFound = !isFruitWithSamePropertiesExists(name, color); 
    if(noSameFruitFound) {
      fruitsInStorage.add(new Fruit(name, color));
    }
  }

  public List<Fruit> getFruitList() {
    return fruitsInStorage;
  }

  public Fruit getFruitByProperty(int color, String name) {
    //... Implement
  }
}
{{</highlight>}}

אוקיי, אז מה יש לנו כאן? 

- יש לנו קלאס מסוג `Fruit` עם המאפיינים של צבע ושם. 
- יש לנו קלאס שנקרא `FruitStorageManager` שאמור לנהל לנו אחסון של פירות. למחסן מותר להכניס רק פירות שעוד לא קיימים בו.
- הקלאס הזה מחזיק רשימה של פירות, ופונקציה להכנסת פירות ייחודיים בלבד.

עכשיו אנחנו רוצים להשתמש בקלאס המדהים שלנו. נניח ואנחנו מפתחים לאנדרואיד (אחרת מה אתם עושים פה?) ויש לנו שני פרגמנטים (Fragments) שבהם אנחנו צריכים להשתמש בקלאס המחסן שלנו. 

{{< highlight java "linenos=table,title=FruitListFragment.java"  >}}
class FruitListFragment extends Fragment {
  //... Init

  private void displayFruitsInList() {
    //...
    List<Fruit> fruitList = getFruitList();
    //... Display it on RecyclerView
  }

  private List<Fruit> getFruitList() {
    
  }
}
{{</highlight>}}

{{< highlight java "linenos=table,hl_lines=,linenostart=1" >}}
class FruitItemFragment extends Fragment {
  //... Init

  private void displayFruitDetails() {
    //...
    Fruit fruitToDisplay = getFruitToDisplay();
    //...
  }

  private Fruit getFruitToDisplay() {
    
  }
}
{{< / highlight >}}

אוקיי, אז בשניהם אנחנו צריכים לקרוא למחסן שלנו. איך אנחנו עושים את זה?

כנראה כך:

{{< highlight java "linenos=table,hl_lines=3 5-8 17" >}}
class FruitListFragment extends Fragment {
  //... Init
  private FruitStorageManager fruitStorageManager;

  @Override
  public void onViewCreated(View view) {
  	 fruitStorageManager = new FruitStorageManager(); 
  }

  private void displayFruitsInList() {
    //...
    List<Fruit> fruitList = getFruitList();
    //... Display it on RecyclerView
  }

  private List<Fruit> getFruitList() {
    return fruitStorageManager.getFruitList();
  }
}
{{< / highlight >}}

הוספנו משתנה מסוג `FruitStorageManager`, דאגנו לאתחל אותו ברגע שה`View` נוצר, ואז אנחנו קוראים לו בהמשך כשאנחנו צריכים לקבל את רשימת הפירות באחסון.

מעולה, עכשיו בואו נעשה את אותו דבר גם בפרגמנט השני.

{{< highlight java "linenos=table,hl_lines=3 6-9 18,linenostart=1" >}}
class FruitItemFragment extends Fragment {
  //... Init
	private FruitStorageManager fruitStorageManager;
	

	  @Override
  public void onViewCreated(View view) {
  	 fruitStorageManager = new FruitStorageManager(); 
  }

  private void displayFruitDetails() {
    //...
    Fruit fruitToDisplay = getFruitToDisplay();
    //...
  }

  private Fruit getFruitToDisplay() {
  	return fruitStorageManager.getFruitByProperty(mFruitColor, mFruitName);  
  }
}
{{< / highlight >}}

גם לכאן הוספנו משתנה מסוג `FruitStorageManager` גם פה אנחנו מאתחלים אותו וקוראים לו במקום בו נרצה להשתמש בו.

**אז איפה הבעיה?** אני מקווה ששמתם לב שבעצם יש לנו שני אינסטנסים (Instance = מופע, או אובייקט שנוצר מקלאס) שונים. 

זאת אומרת שאם אני מוסיף פירות חדשים בפרגמנט `FruitItemFragment` האינסטנס שבפרגמנט `FruitListFragment` לא יהיה מודע לזה כלל, כי למעשה אלו שתי אובייקטים שונים לחלוטין.

זה ממש לא מה שרצינו, נכון?

אנחנו רוצים מקום אחד שמנהל לנו את כל האחסון וששני הפרגמנטים יפנו לאותו מקום אחד. אנחנו רוצים **סינגלטון**.

## מה מגדיר סינגלטון

> **תבנית סינגלטון** (מאנגלית: **Singleton**, בעברית: **יחידן** לפי האקדמיה ללשון העברית) היא [תבנית עיצוב](https://he.wikipedia.org/wiki/תבנית_עיצוב) ב[הנדסת תוכנה](https://he.wikipedia.org/wiki/הנדסת_תוכנה), אשר נועדה למקרים בהם מעוניינים להגביל את יצירת המופעים של [מחלקה](https://he.wikipedia.org/wiki/מחלקה_(תכנות)) מסוימת למופע יחיד. תבנית זו מקושרת לעיתים גם למקרים בהם רוצים להגביל את מספר המופעים לכמות קבועה כלשהי, ולאו דווקא למופע יחיד. תבנית זו שימושית כאשר נדרש רק מופע אחד על מנת לתאם פעולות במערכת. [מתכנתים](https://he.wikipedia.org/wiki/מתכנת) מסוימים מגדירים את התבנית הזו כתבנית [anti-pattern](https://he.wikipedia.org/w/index.php?title=Anti-pattern&action=edit&redlink=1), כלומר, תבנית שנראית מאוד פשוטה וברורה, אבל בפועל היא לא אופטימלית, או שימושית. הגדרה זו נובעת מכך שתבנית זו היא שכיחה מאוד בקרב מפתחים, ולעיתים רבות יוצרת הגבלות שלא לצורך, במצבים בהם אין צורך ממשי במופע יחיד.

מתוך [ויקיפדיה](https://he.wikipedia.org/wiki/סינגלטון (תבנית עיצוב))

כדי שקלאס יהיה סינגלטון הוא צריך לממש את הכללים הבאים

1. הוא יכול להיווצר רק פעם אחת בחיי אפליקציה (כלומר יש לו אינסטנס אחד)

2. הגישה אליו חייבת להיות גלובלית (כלומר הוא צריך להיות זמין לקריאה מכל קלאס)

למרות ששתי ההגדרות האלה נשמעות פשוטות, למעשה כשצוללים פנימה מגלים שלא תמיד כל כך לשמור עליהן.



## איך יוצרים סינגלטון (בג׳אווה)

אוקיי אז דבר ראשון אנחנו צריכים למנוע את האפשרות לייצר אינסטנס לקלאס שלנו. 

זה די קל, אנחנו נהפוך את הקונסטרקטור שלנו ל `private` כך לקלאסים חיצוניים לא תהיה גישה אליו וממילא לא תהיה אפשרות ליצור אותו.

{{< highlight java "linenos=table,hl_lines=4"  >}}
class FruitStorageManager {
  private List<Fruit> fruitsInStorage;

  private FruitStorageManager() {
    fruitsInStorage = new ArrayList<>();
  }

	//....
}
{{</highlight>}}

עכשיו אנחנו רוצים שכן תהיה אפשרות לקרוא לו מבחוץ, אבל אנחנו צריכים שהקריאה הזאת תהיה גלובלית, זאת אומרת שאנחנו רוצים שזו תהיה פונקציה סטטית.

**פונקציה סטטית** היא פונקציה מיוחדת, היא אמנם חלק מהקלאס אבל היא זמינה ברמת **האפליקציה**, כלומר היא **גלובלית**. 

ובשונה מפונקציות וממשתנים רגילים שחיים ברמת האובייקט (הם **לא** משותפים לכל האינסטנסים) פונקציות ומשתנים סטטיים חיים ברמת הקלאס (הם **כן** משותפים לכל האינסטנסים).

{{< highlight java "linenos=table,hl_lines=2 9-11"  >}}
class FruitStorageManager {
  private static FruitStorageManager sInstance = new FruitStorageManager();
  private List<Fruit> fruitsInStorage;

  private FruitStorageManager() {
    fruitsInStorage = new ArrayList<>();
  }

  public static FruitStorageManager getInstance() {
  	return sInstance;
  }
	//...
}
{{</highlight>}}

עכשיו כבר הוספנו משתנה סטטי `sInstance` שהוא בעצם האינסטנס היחיד שאי פעם יווצר לקלאס הזה, ואותו אנחנו יוצרים מתוך הקלאס שלנו כי רק לקלאס שלנו יש אפשרות ליצור אינסטנס של עצמו.

![yo dawg singelton](https://i.imgflip.com/3dellc.jpg)

### איך קוראים לסינגלטון

מתוך הפרגמנטים שלנו, אנחנו נקרא לסינגלטון ישירות, כבר לא נצטרך להחזיק אינסטס של המחסן. זה ייראה ככה

{{< highlight java "linenos=table,hl_lines=11" >}}
class FruitListFragment extends Fragment {
  //... Init

  private void displayFruitsInList() {
    //...
    List<Fruit> fruitList = getFruitList();
    //... Display it on RecyclerView
  }

  private List<Fruit> getFruitList() {
    return FruitStorageManager.getInstance().getFruitList();
  }
}
{{< / highlight >}}

ובפרגמנט `FruitItemFragment` נעשה משהו דומה

{{< highlight java "linenos=table,hl_lines=10,linenostart=1" >}}
class FruitItemFragment extends Fragment {

  private void displayFruitDetails() {
    //...
    Fruit fruitToDisplay = getFruitToDisplay();
    //...
  }

  private Fruit getFruitToDisplay() {
  	return FruitStorageManager.getInstance().getFruitByProperty(mFruitColor, mFruitName);  
  }
}
{{< / highlight >}}

הרבה יותר נקי ונכון ובעיקר משותף! שזה בדיוק מה שרצינו.

### Lazy Loading (טעינה זוחלת)

זה כבר מקדם אותנו המון ולמעשה כבר מילאנו אחר שני הכללים שהגדרנו קודם. הסינגלטון שלנו יכול להיווצר רק כאינסטנס אחד, והוא זמין באופן גלובלי לכל קלאס באפליקציה.

אבל, זו גם בעיה. בדוגמה שלנו זו לא כל כך בעיה, אבל אם הסינגלטון שלנו כותב למשל ללוג, ובקונסטרקטור שלו יש אתחול של קובץ הלוגים שזו פעולה לא מאוד זריזה ודי אוכלת משאבים. הפעולה הזאת תקרה גם אם אף אחד לא יקרא לעולם ל`getInstance` - רק בגלל שזה משתנה סטטי ו`java` תנסה לטעון אותו עם עליית האפליקציה. 

ואם יש לכם כמה סינגלטונים באפליקציה? כולם ייטענו מיד אפילו שאף אחד עוד לא השתמש בהם, וגרוע מזה אפילו אם אף אחד לא הולך להשתמש בהם לעולם.

כדי להימנע מזה אנחנו רוצים ליצור את האינסטנס רק בפעם הראשונה שבה מישהו קורא לו.

{{< highlight java "linenos=table,hl_lines=2 10-12"  >}}
class FruitStorageManager {
  private static FruitStorageManager sInstance;
  private List<Fruit> fruitsInStorage;

  private FruitStorageManager() {
    fruitsInStorage = new ArrayList<>();
  }

  public static FruitStorageManager getInstance() {
  	if(sInstance == null) {
  		sInstance = new FruitStorageManager();
  	}
  	return sInstance;
  }
	//...
}
{{</highlight>}}

כאן הסרנו למעשה את פעולת האיתחול של הסינגלטון מהשורה של הגדרת המשתנה. הסינגלטון שלנו יווצר רק אם כשמישהו קורא לו הוא עדיין לא נוצר.

{{<subscribe text="לא רוצה לפספס את הפוסט הבא על דיזיין פטרנס?">}}

### Thread Safety (מקביליות)

לייזי לודינג עובד נהדר עד שנזכרים שיש גם ת׳רדים אחרים. אין כמעט אפליקציה שלא משתמשת בתכנות מקבילי. זה לפעמים נשמע מסובך אבל למעשה זה קונספט די פשוט.

נניח והאפליקציה שלי עולה, היא מציגה איזו אנימציה חמודה בזמן שאנחנו מחכים שהיא תטען את הדאטה מהשרת. הבעיה היא שבזמן שאני מחכה לשרת אני ״תופס״ את המעבד, הריצה של האפליקציה נעצרת ומחכה לקבל ממני סימן שהפעולה שביקשתי (הקריאה לשרת) הסתיימה ואפשר להמשיך בהרצה.

בזמן הזה, מכיון שהתהליך (הריצה של האפליקציה על המעבד) ״תקוע״, אי אפשר להריץ את האנימציה החמודה שלי והיא פשוט נתקעת.

מכיון שאנחנו מתכנתים טובים ונורא חשובה לנו חווית המשתמש, אנחנו רוצים שהקריאה לשרת והאנימציה יקרו **במקביל**. 

בג׳אווה (ובעוד הרבה מאוד שפות אחרות) הדרך לעשות את זה, היא באמצעות יצירת `Thread` - שם גרוע ליצירת תהליך וירטואלי במעבד. 

כשאני יוצר thread אני בעצם מבקש מהמעבד לבצע יותר מדבר אחד בו זמנית (תניחו כרגע שזה אפשרי, אני לא נכנס לאיך זה מתבצע ברמת המעבד). 

היכולת הנפלאה הזאת יוצרת לנו כאן בעיה מאוד גדולה.

נדמיין שת׳רד מסויים - נקרא לו אבי - קורא לסינגלטון שלנו. הוא נכנס ל`getInstance` בודק ורואה שהוא `null` ואז כמובן הולך ויוצר את האינסטנס. **במקביל** ת׳רד אחר - נקרא לו יוסי - עושה בדיוק את אותו הדבר. הוא נכנס ל`getInstance` בודק ורואה שהוא `null` (כי אנחנו חיים בעולם מקביל נכון? האינסטנס שאבי יוצר עוד לא נוצר) ויוצר אחד חדש! כאשר שניהם יסיימו יש לנו כאן שני אינסטנסים שנוצרו (כשאחד ידרוס את השני), ולמעשה כבר אין לנו ממש **סינגלטון**. באסה.

אבל לא באנו לאן כדי להתבאס, באנו לכאן כדי לפתור דברים. 

למזלנו המפתחים של ג׳אווה כבר חשבו על זה בשבילנו, וכדי לפתור את המצבים האלה (שמכונים race-condition) הם יצרו את המילה השמורה **[synchronized](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)**. 

synchronized זו מילת קסם שאם מוסיפים אותה לפונקציה היא **מסנכרנת** בין ת׳רדים שונים.

למשל, ת׳רד אבי מנסה לגשת ל`getIsntance` ג׳אווה בודקת ורואה שאין שם כרגע אף אחד ונותנת לו להיכנס. בינתיים ת׳רד יוסי מגיע, ומבקש גם הוא להיכנס ל`getInstance`, ג׳אווה בודקת ורואה שאבי שם ולכן מבקשת יפה מיוסי לחכות קצת עד שאבי יסיים. רק כאשר אבי מסיים, יוסי נכנס. כך למעשה רק ת׳רד אחד יכול להיות בתוך פונקצייה מסונכרנת ברגע נתון.

{{< highlight java "linenos=table,hl_lines=9"  >}}
class FruitStorageManager {
  private static FruitStorageManager sInstance;
  private List<Fruit> fruitsInStorage;

  private FruitStorageManager() {
    fruitsInStorage = new ArrayList<>();
  }

  public static synchronized FruitStorageManager getInstance() {
  	if(sInstance == null) {
  		sInstance = new FruitStorageManager();
  	}
  	return sInstance;
  }
	//...
}
{{</highlight>}}

כך, בהוספה פשוטה של מילה אחת! פתרנו את הבעיה.

אבל, גם איבדנו את המקביליות. אם כמה ת׳רדים יקראו במקביל ל`getInstance`, רק אחד מהם יוכל להיכנס לפונקציה ברגע נתון. אם כמה ת׳רדים רוצים לבדוק מה מצב הפירות שלנו במחסן, אנחנו ניתן להם לבדוק את זה רק אחד אחרי השני. 

כמה פעמים כבר נגיע לסיטואציה של יצירת אינסטנס חדש? פעם אחת בלבד. ובשביל הפעם האחת הזאת אנחנו מבטלים את המקביליות של `getInstance` לחלוטין? זה לא הגיוני.

היינו רוצים דרך לבטל את המקביליות רק בזמן של יצירת אינסטנס, אבל לשמור עליה בכל קריאה רגילה ל`getInstance`. אז כמובן, יש דרך לעשות זאת.

במקום להפוך את כל הפונקציה למסונכרנת, אנחנו ניצור בלוק מסונכרן רק אם `sInstance` הוא `null`.

{{< highlight java "linenos=table,hl_lines=9 11-15"  >}}
class FruitStorageManager {
  private static FruitStorageManager sInstance;
  private List<Fruit> fruitsInStorage;

  private FruitStorageManager() {
    fruitsInStorage = new ArrayList<>();
  }

  public static FruitStorageManager getInstance() {
  	if(sInstance == null) {
  		synchronized(FruitStorageManager.class) {
  			if(sInstance == null) {
	  			sInstance = new FruitStorageManager();
	  		}
  		}
  	}
  	return sInstance;
  }
	//...
}
{{</highlight>}}

הסרנו את הסנכרון מהפונקציה והעברנו אותה לבלוק. 

עכשיו אבי מגיע, רואה ש`sInstance` הוא `null` ונכנס לבלוק המסונכרן. מכיון שאין שם עוד אף אחד אחר הוא יוצר את האינסטנס ויוצא. יוסי שהגיע בזמן שאבי יוצר את האינסטנס גם רואה ש`sInstance` הוא `null` אז הוא מנסה להגיע לבלוק ונחסם, אחרי שהחסימה שלו תשתחרר (אבי עזב את הבלוק), הוא יכנס אל הבלוק אבל אז (מכיון שהוספנו גם לשם בדיקת null) הוא יגלה ש `sInstance` כבר לא `null` וימשיך בלי ליצור כלום.

מושלם! יש לנו גם לייזי לודינג, גם מקביליות ונשארנו סינגלטון.

## סינגלטון בקוטלין

קוטלין הציגה לעולם את השימוש ב [object](https://kotlinlang.org/docs/tutorials/kotlin-for-py/objects-and-companion-objects.html). מה זה object אתם שואלים? ובכן object זה סינגלטון. כן כן, המפתחים של קוטלין יודעים כמה הרבה אנחנו משתמשים בסינגלטון, הם מודעים לכל הבעיות שהצגנו כאן בפוסט והם החליטו לאפשר לנו לבצע את זה בקלות מרשימה.

כל מה שאנחנו צריכים לעשות זה להשתמש ב`object` במקום ב`class` וזהו, הקלאס שלנו הוא סינגלטון, שהוא גם לייזי (הוא יווצר רק בקריאה הראשונה) וגם thread safe (תהליך היצירה שלו מסונכרן).

{{< highlight java "linenos=table"  >}}
object FruitStorageManager {
  private val fruitsInStorage = emptyArrayOf();

	//...All of the other functions
}
{{</highlight>}}

מגניב, מה?

## מה דעתכם?

זהו, זה כל מה שצריך לדעת על סינגלטונים באנדרואיד. יש לכם שאלות? חושבים על מקומות שבהם שימוש בסינגלטון דווקא יכול להיות פחות יעיל? חושבים שקוטלין זה מדהים? יאללה שתפו בתגובות
