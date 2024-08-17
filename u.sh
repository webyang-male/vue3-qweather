info=$1
if ["$info" = ""];
then info="feat:finished aircondition  chart"
fi
git add -A
git commit -m "$info"
git push origin main