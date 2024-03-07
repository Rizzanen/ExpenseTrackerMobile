This is a React-native expo application where the user can track their expenses on a monthly level. There are predefined categories where the user can add expenses and it displays total expenses of each category and the total expenses of current month. When the month changes the previous months expenses are saved to SQLite database and displayed on history page. 

The automatical check if the month has changed was implemented by saving the current month value each time the app is oppened to database. If current month is different from the previous value it will start a function which saves the expense data to history table and then resets the expense table. 

