---
title: "בילדר (Builder) - בניית אובייקטים גמישה"
date: 2019-10-24T23:10:38+03:00
tags: ["design patterns"]
keywords: ["בילדר", "design patterns"]
images: ["/builder.jpg"]
draft: false
---

![builder](/builder.jpg)

אז אחרי שלמדנו איך יוצרים סינגלטון ולמה, הגיע הזמן לדיזיין פטרן הבא ברשימת ה**creational**.

בילדר הוא עוד אחד מהפטרנים הנפוצים, למעשה אם יצא לכם לפתח לאנדרואיד אפילו קצת כנראה שכבר נתקלתם בו כמה פעמים, תכף נראה איפה.

אז למה צריך אותו ואיך כותבים אותו נכון? 

## למה אנחנו צריכים בילדר?

בפיתוח תוכנה אנחנו משתמשים בהרבה פונקציות, אנחנו רוצים להיות כמה שיותר גמישים ולהשתמש באותה פונקציה מכמה מקומות, כדי שלא נצטרך להעתיק קוד לכל מקום בו אנחנו צריכים לוגיקה זהה.

לשם דוגמה, נניח ויש לי `view` שמציג התראות על המסך, נקרא לו `AlertView` - שם יפה. ונניח שהוא נראה ככה

{{< highlight java "linenos=table,hl_lines="  >}}

class AlertViewDialog extends Dialog {
    private final TextView mTitleTv; // כותרת להודעה
    private final TextView mMessageTv; // ההודעה עצמה
    private final Button mPositiveBtn;  // כפתור אישור
    private final Button mNegativeBtn; // כפתור ביטול/דחיה

    // דמיינו שיש כאן קונסטרקטורים ואיתחול של הview
    
    public void setTitle(final String text) {
        mTitleTv.setText(text);
    }
    
    public void setMessage(final String message) {
        mMessageTv.setText(message);
    }
    
    public void setPositiveAction(final String positiveAction) {
        mPositiveBtn.setText(positiveAction);
    }
    
    public void setNegativeAction(final String negativeAction) {
        mNegativeBtn.setText(negativeAction);
    }
    
    public void setPositiveBtnClickListener(final View.OnClickListener onClickListener) {
        mPositiveBtn.setOnClickListener(onClickListener);
    }
    
    public void setNegativeBtnClickListener(final View.OnClickListener onClickListener) {
        mNegativeBtn.setOnClickListener(onClickListener);
    }

}
{{</highlight>}}

אז מה יש לנו פה? 

יש לנו `view` שיודע לקבל טקסט לכותרת, הודעה ושני כפתורים - כפתור לאישור וכפתור לביטול.

כשנרצה לקרוא לו מתוך האפליקציה שלנו, זה ייראה בערך ככה.

{{< highlight java "linenos=table,hl_lines="  >}}

public void someFunction() {
    AlertViewDialog alertDialog = new AlertViewDialog();
    alertDialog.setTitle("Failure");
    alertDialog.setMessage("I'm sorry that I have failed you");
	alertDialog.setPositiveAction("Accept");
	alertDialog.setNegativeAction("Kill App");
	alertDialog.setPositiveBtnClickListener(() ->  /* show a message or something */ );
	alertDialog.setNegativeBtnClickListener(() -> /* do nothing */ );
	alertDialog.show(); 
}

{{</highlight>}}

אנחנו יוצרים את ה`view`, שמים לו את הערכים הנכונים, טקסטים ופונקציות שיקראו בלחיצה על כל אחד מהכפתורים, ואז קוראים ל`show` כדי להציג אותו על המסך.

נראה די מובן.

ואם אנחנו צריכים לייצר `AlertViewDialog` במקום אחר? לא בעיה, נעשה שם את אותו דבר.

{{< highlight java "linenos=table,hl_lines="  >}}

public void someOtherFunction() {
    AlertViewDialog alertDialog = new AlertViewDialog();
    alertDialog.setTitle("Failure");
    alertDialog.setMessage("I'm sorry that I have failed you");
	alertDialog.setPositiveAction("Accept");
	alertDialog.setNegativeAction("Kill App");
	alertDialog.setPositiveBtnClickListener(() ->  /* show a message or something */ );
	alertDialog.setNegativeBtnClickListener(() -> /* do nothing */ );
	alertDialog.show(); 
}

{{</highlight>}}

אה באמת? שירים את היד מי שחושב שזה הגיוני להעתיק ככה קוד ממקום למקום. לא יותר הגיוני לקרוא לקוד של היצירה וההצגה של ה`alert` ממקום אחד?

### פונקציה יצרנית

בהחלט יותר הגיוני, וזה בדיוק מה שנעשה. אנחנו נכתוב פונקציה שיוצרת ומציגה `AlertViewDialog` כשקוראים לה, והיא תכיל את הקוד.

{{< highlight java "linenos=table,hl_lines="  >}}

public class UtilFunctions {
  public static void showAlertDialog() {
      AlertViewDialog alertDialog = new AlertViewDialog();
      alertDialog.setTitle("Failure");
      alertDialog.setMessage("I'm sorry that I have failed you");
      alertDialog.setPositiveAction("Accept");
      alertDialog.setNegativeAction("Kill App");
      alertDialog.setPositiveBtnClickListener(() ->  /* show a message or something */ );
      alertDialog.setNegativeBtnClickListener(() -> /* do nothing */ );
      alertDialog.show(); 
  }
}

{{</highlight>}}

ועכשיו אנחנו פשוט נקרא לה מכל מקום בו אנחנו צריכים להציג הודעות שגיאה באפליקציה.

למשל,

{{< highlight java "linenos=table,hl_lines="  >}}

private void someFunction() {
	UtilFunctions.showAlertDialog();
}

private void someOtherFunction() {
	UtilFunctions.showAlertDialog();
}

{{</highlight>}}

הרבה יותר קל, נכון? נכון.

עד ש, עד שאנחנו צריכים לשנות משהו. למשל את הטקסט של הכותרת. 

אוקיי, לא בעיה פשוט נוסיף פרמטרים לפונקציה שלנו.

{{< highlight java "linenos=table,hl_lines=2 4-9"  >}}

public class UtilFunctions {
  public static void showAlertDialog(final String title, final String message, final String positiveAction, final String negativeAction ) {
      AlertViewDialog alertDialog = new AlertViewDialog();
      alertDialog.setTitle(title);
      alertDialog.setMessage(message);
      alertDialog.setPositiveAction(positiveAction);
      alertDialog.setNegativeAction(negativeAction);
      alertDialog.setPositiveBtnClickListener(positiveBtnClickListener);
      alertDialog.setNegativeBtnClickListener(negativeBtnClickListener;
      alertDialog.show(); 
  }
}

{{</highlight>}}

ועכשיו מכל מקום בו נקרא לפונקציה שלנו נוכל לתת לה פרמטרים אחרים, וכך לקבל `AlertDialogView` שיוצג עם ערכים שונים.

לדוגמה

{{< highlight java "linenos=table,hl_lines="  >}}

private void someFunction() {
	UtilFunctions.showAlertDialog("Error", "An Error Occured", "OK", "Cancel", view -> {/*Some logic here*/}, view -> {/*Some other logic here*/});
}

private void someOtherFunction() {
	UtilFunctions.showAlertDialog("Big Error!!", "Horrible Error just happened", "OK", "Kill Me Now!!", view -> {/*Some logic here*/}, view -> {/*Some other logic here*/});
}

{{</highlight>}}

אוקיי, מעולה, זה באמת יותר גמיש עכשיו.

אבל גם הרבה יותר ארוך. והאם באמת אנחנו צריכים לקרוא לכל הפרמטרים כל פעם רק בגלל שפעם אחת אנחנו צריכים פרמטרים אחרים?

ואם אני לא רוצה לנהל מה קורה כשיוזר לוחץ `cancel` יכול להיות שבמקום מסויים זה ממש לא חשוב, אני עדיין חייב להעביר שם ערך רק כי זה מה שהפונקציה מבקשת ממני. זה ממש **מבאס**. לא, סליחה, זה לא **יעיל**.

הייתי רוצה פונקציה שאני מעביר לה רק מה שאני רוצה **להציג** ושאם לא העברתי ערך מסוים אז הוא לא יוצג. ושאני אוכל גם להשתמש בערכי דיפולט (ברירת מחדל) ולא אצטרך לכתוב את אותו דבר שוב ושוב. 

## Method Overloading

אוקיי, אני יכול לעשות את זה. אני פשוט אצור כמה פונקציות עם פרמטרים שונים. ככה

{{<highlight java "linenos=table,hl_lines=13-15"  >}}

public class UtilFunctions {
  public static void showAlertDialog(final String title, final String message, final String positiveAction, final String negativeAction ) {
      AlertViewDialog alertDialog = new AlertViewDialog();
      alertDialog.setTitle(title);
      alertDialog.setMessage(message);
      alertDialog.setPositiveAction(positiveAction);
      alertDialog.setNegativeAction(negativeAction);
      alertDialog.setPositiveBtnClickListener(positiveBtnClickListener);
      alertDialog.setNegativeBtnClickListener(negativeBtnClickListener;
      alertDialog.show(); 
  }

  public static void showAlertDialog(final String title) {
  	showAlertDialog(title, "A default message", "OK", "Kill Bill", () -> { /* Show something */}, () -> { /* Dismiss Something */})
  }
}

{{</highlight>}}

מעולה. יש לי את הפונקציה שמקבלת את כל הפרמטרים, ויש פונקציה שמקבלת רק את ה`title` ואת שאר הערכים ממלאת בערכי דיפולט. 

כך אני אקרא בכל מקום לפונקציה הקצרה ואיפה שצריך שינויים יותר נרחבים אני אקרא לפונקציה המלאה.

{{< highlight java "linenos=table,hl_lines=6"  >}}

private void someFunction() {
	UtilFunctions.showAlertDialog("Error", "An Error Occured", "OK", "Cancel", view -> {/*Some logic here*/}, view -> {/*Some other logic here*/});
}

private void someOtherFunction() {
	UtilFunctions.showAlertDialog("Big Error!!");
}

{{</highlight>}}

בג׳אווה הפעולה הזאת נקראת **Method Overloading** שזה אומר ״העמסת מתודות״, וזה שם מוזר (כרגיל בתכנות) כדי להגיד פונקציה שקוראת לפונקציה בעלת אותה שם. אם אני יודע שרוב הזמן צריכים לשנות רק פרמטר אחד, אני אצור פונקציה חדשה שמקבלת רק את אותו פרמטר ומשימה (assign) לפרמטרים האחרים ערכי דיפולט.

ואם שמתי לב שרוב הזמן קוראים לאותו `title`? אז אין בעיה נוסיף עוד פונקציה!

{{<highlight java "linenos=table,hl_lines=17-19"  >}}

public class UtilFunctions {
  public static void showAlertDialog(final String title, final String message, final String positiveAction, final String negativeAction ) {
      AlertViewDialog alertDialog = new AlertViewDialog();
      alertDialog.setTitle(title);
      alertDialog.setMessage(message);
      alertDialog.setPositiveAction(positiveAction);
      alertDialog.setNegativeAction(negativeAction);
      alertDialog.setPositiveBtnClickListener(positiveBtnClickListener);
      alertDialog.setNegativeBtnClickListener(negativeBtnClickListener;
      alertDialog.show(); 
  }

  public static void showAlertDialog(final String title) {
  	showAlertDialog(title, "A default message", "OK", "Kill Bill", () -> { /* Show something */}, () -> { /* Dismiss Something */})
  }

  public static void showAlertDialog() {
  	showAlertDialog("Default Title", "A default message", "OK", "Kill Bill", () -> { /* Show something */}, () -> { /* Dismiss Something */})
  }
}

{{</highlight>}}

מקסים! ומבלבל! נורא נורא מבלבל. מלא פונקציות בקלאס אחד זה נורא מבלבל, ולא תמיד ברור לאיזה פרמטרים קוראים. וכל פעם שמוסיפים פרמטר צריכים להוסיף עוד פונקציה ומהר מאוד הכל מתמלא במלא פונקציות עם אותו שם ונורא נורא קשה לעקוב אחרי זה.

אז מה עושים? אנחנו צריכים אובייקט שיוגדר באופן דינמי. שנעביר לו רק מה שאנחנו באמת צריכים להעביר. אנחנו צריכים **בילדר**.

## מה מגדיר בילדר?

ההגדרה הרשמית אומרת ש**בילדר** פטרן מיועד להפריד בין יצירה של אובייקט למימוש שלו, כך שיש דרך אחת ליצור אובייקטים שונים.

דרך יפה לחשוב על זה היא צבעים. יש דרך אחת ליצור צבע מורכב, לוקחים כמה צבעי יסוד, מערבבים אותם ומרכיבים מזה צבע חדש. 

אני יכול לשפוך לדלי צבע אחד, או 2, או שלושה, אני יכול לשים ירוק או אדום, או גם ירוק וגם אדום, אולי להוסיף גם צהוב. ה**דרך** ליצירת הצבע היא תמיד אותו דבר, אבל ה**תוצאה** תהיה שונה.

{{<subscribe text="לבנות ידע בפיתוח זו משימה שדורשת התמדה, אל תפספסו את הפוסט הבא!">}}

## איך ליצור בילדר (בג׳אווה)

כדי ליצור בילדר אנחנו צריכים ליצור `inner class` בתוך הקלאס של האובייקט שלנו. 

בואו ניקח את ה`AlertDialogView` שלנו ונוסיף לו בילדר.

{{<highlight java "linenos=table,hl_lines=">}}

public class AlertViewDialog {

	public static class Builder {
		private String mTitle;
		private String mMessage;
		private String mPositiveAction;
		private String mNegativeAction;
		private View.OnClickListener mPositiveActionClickListener;
		private View.OnClickListener mNegativeActionClickListener;
		
		public Builder withTitle(final String title) {
			mTitle = title;
			return this;
		}
		
		public Builder withMessage(final String message) {
			mMessage = message;
			return this;
		}
		
		public Builder withPositivAction(final String positiveAction) {
			mPositiveAction = positiveAction;
			return this;
		}
		
		public Builder withNegativeAction(final String negativeAction) {
			mNegativeAction = negativeAction;
			return this;
		}
		
		public Builder withPositivActionClickListener(final View.OnClickListener positiveActionClickListener) {
			mPositiveActionClickListener = positiveActionClickListener;
			return this;
		}
		
		public Builder withNegativeActionClickListener(final View.OnClickListener negativeActionClickListener) {
			mNegativeActionClickListener = negativeActionClickListener;
			return this;
		}
		
		public AlertViewDialog build() {
			AlertViewDialog dialog = new AlertViewDialog();
			dialog.setTitle(mTitle);
			dialog.setMessage(mMessage);
			dialog.setPositiveAction(mPositiveAction);
			dialog.setNegativeAction(mNegativeAction);
			dialog.setPositivActionClickListener(mPositiveActionClickListener);
			dialog.setNegativeActionClickListener(mNegativeActionClickListener);
			return dialog;
		}
	}
}

{{</highlight>}}

לא הרבה קורה כאן, למעשה בשלב הזה יכול להיות שאתם עדיין לא מבינים מה שיפרנו כאן, אז רגע לפני שאני מסביר בואו נראה איך אנחנו קוראים לבילדר שלנו כדי ליצור `AlertDialogView`. 

{{<highlight java "linenos=table,hl_lines="  >}}

private void someFunction() {
	AlertViewDialog alertViewDialog = new AlertViewDialog.Builder()
		.withTitle("Error")
		.withMessage("An Error Occured")
		.withPositiveAction("OK")
		.withNegativeAction("Cancel")
		.withPositivActionClickListener(view -> {/*Some logic here*/})
		.withNegativeActionClickListener(view -> {/*Some other logic here*/})
		.build();
	alertViewDialog.show();
}

{{</highlight>}}

לפני כל דבר אחר, שמתם לב כמה זה קריא? כל מי שקורא את הקוד הזה מבין ישר איזה טקסט הוא ה`title` ואיזה ה`positiveAction`, הוא לא צריך ללכת לחפש בפונקציה המקורית איפה נמצא כל דבר. וקריאות זה כבר דבר עצום.

אבל זה לא הכל, מכיון שיש לנו פונקציה לכל פרמטר, אנחנו לא חייבים לשלוח כל פרמטר. כך שאם למשל אנחנו רוצים `dialog` בלי `title` אנחנו פשוט לא נשלח אותו.

{{<highlight java "linenos=table,hl_lines="  >}}

private void someFunction() {
	AlertViewDialog alertViewDialog = new AlertViewDialog.Builder()
		.withMessage("An Error Occured")
		.withPositiveAction("OK")
		.withNegativeAction("Cancel")
		.withPositivActionClickListener(view -> {/*Some logic here*/})
		.withNegativeActionClickListener(view -> {/*Some other logic here*/})
		.build();
	alertViewDialog.show();
}

{{</highlight>}}

אם אנחנו רוצים אפשרות ״להעלים״ כפתורים, אנחנו יכולים להתייחס לזה בבילדר שלנו. 

לדוגמה:

{{<highlight java "linenos=table,hl_lines=11-20">}}

public class AlertViewDialog {

public static class Builder {

	// All the other functions
	
	public AlertViewDialog build() {
		AlertViewDialog dialog = new AlertViewDialog();
		dialog.setTitle(mTitle);
		dialog.setMessage(mMessage);
		if(TextUtils.isEmpty(mPositiveAction)) {
			dialog.setPositiveActionVisability(View.GONE);
		} else {
			dialog.setPositiveAction(mPositiveAction);
		}
		if(TextUtils.isEmpty(mNegativeAction)) {
			dialog.setNegativeActionVisability(View.GONE);
		} else {
			dialog.setNegativeAction(mNegativeAction);
		}
		dialog.setPositivActionClickListener(mPositiveActionClickListener);
		dialog.setNegativeActionClickListener(mNegativeActionClickListener);
		return dialog;
	}
}

}

{{</highlight>}}

ועכשיו אם מישהו לא רוצה להציג את אחד מהכפתורים, הוא פשוט לא ישלח לבילדר שלנו טקסט לכפתור הזה, והופ! הכפתור לא יוצג.

כל כך נוח! 

## ערכי דיפולט

מה לגבי ערכי דיפולט? 

אז יש בזה שתי גישות, יש שיגידו שאם לא שלחו לנו ערך נשתמש בערכי דיפולט. למשל `title` הוא תמיד `An error`, אלא אם כן שלחו לנו ערך אחר.

זו אופציה סבירה, אבל בעיני קצת בעייתית. מאין לי לדעת שלבילדר שאני משתמש בו יש ערכי דיפולט? ההיגיון אומר שאם לא שלחתי ערך אני לא מעוניין בו, לא כך?

האופציה השניה והמועדפת בעיני היא להשתמש בפונקצית `withDefaults`. 

בואו נוסיף אותה לבילדר שלנו.

{{<highlight java "linenos=table,hl_lines=">}}

public class AlertViewDialog {

    public static class Builder {
    
    // All the other functions
    private final String TITLE = "An Error";
    private final String MESSAGE = "An error has occurred, please try again later";
    private final String POSITIVE_ACTION = "Try Again Now";
    private final String NEGATIVE_ACTION = "Cancel";
    
        public Builder withDefaults() {
            mTitle = TITLE;
            mMessage = MESSAGE;
            mPositiveAction = POSITIVE_ACTION;
            mNegativeAction = NEGATIVE_ACTION;
            return this;
        }
    
    }

}

{{</highlight>}}

בצורה הזאת מי שקורא לבילדר שלנו יכול להשתמש בערכי הדיפולט שלנו או אפילו רק בחלקם.

לדוגמה

{{<highlight java "linenos=table,hl_lines=3"  >}}

private void someFunction() {
	AlertViewDialog alertViewDialog = new AlertViewDialog.Builder()
		.withDefaults()
		.withPositiveAction("OK")
		.withPositivActionClickListener(view -> {/*Some logic here*/})
		.withNegativeActionClickListener(view -> {/*Some other logic here*/})
		.build();
	alertViewDialog.show();
}

{{</highlight>}}

בצורה הזאת ה`title` ה`message` וה`negative action` יהיו ערכי הדיפולט שלהם, אבל `positive action` יהיה `ok` כמו שביקשנו. נחמד, אה?

## מה דעתכם?

אז מה אתם אומרים? יכולים לחשוב על דרך שבה בילדר יכול לשפר את הקוד הקיים שלכם? אשמח שתשתפו דוגמאות קוד ונראה איך בילדר ישפר אותם!