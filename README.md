# STOCKBOT – פרסום מהמצב הנוכחי

כרגע הריפו הזה מכיל `index.html` ברוט, ולכן הפרסום המהיר והבטוח הוא דרך **GitHub Pages**.

---

## מה הוכן עבורך

נוסף Workflow אוטומטי לפריסה:

- `.github/workflows/deploy-pages.yml`

ה־workflow מבצע deploy אוטומטי בכל push ל־`main` וגם מאפשר הרצה ידנית מ־Actions.

---

## איך לפרסם בדיוק (שלב-אחר-שלב)

### 1) העלאה ל־GitHub

אם עוד לא העלית:

```bash
git add .
git commit -m "Prepare GitHub Pages deployment"
git push origin main
```

### 2) הפעלת GitHub Pages

1. היכנס לריפו ב־GitHub
2. לחץ `Settings`
3. בתפריט הצד לחץ `Pages`
4. תחת **Build and deployment** בחר:
   - **Source**: `GitHub Actions`

> חשוב: לא לבחור "Deploy from a branch" כי כבר הוגדר workflow אוטומטי.

### 3) הרצה ובדיקה

1. היכנס ללשונית `Actions`
2. וודא שרץ workflow בשם: **Deploy STOCKBOT shell to GitHub Pages**
3. המתן לסיום עם סטטוס ירוק ✅

### 4) קבלת הלינק החי

אחרי הצלחה, הכתובת תהיה בפורמט:

`https://<your-username>.github.io/<repo-name>/`

לדוגמה (אם הריפו נשאר `STOCKBOT`):

`https://amitos11.github.io/STOCKBOT/`

---

## זמן עד שרואים שינוי

בדרך כלל: 30 שניות עד 2 דקות.
לפעמים: עד 10 דקות (קאש).

אם לא רואים שינוי:

- Hard refresh (`Ctrl+F5` / `Cmd+Shift+R`)
- פתיחה ב־Incognito
- בדיקה שה־workflow האחרון ב־Actions הצליח

---

## הערה חשובה על המצב הנוכחי

הפריסה הנוכחית דרך Pages מפרסמת את `index.html` (המעטפת).

אם תרצה לפרסם את אפליקציית Next.js המלאה (`/top10`, `/stock/[symbol]`) כ־production app אמיתי,
עדיף לפרוס ל־Vercel (או להכין export/adapter מלא ל־Pages).
