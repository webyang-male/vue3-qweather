info=$1
if ["$info" = ""];
then info="update:finished the structure of living index"
fi
git add -A
git commit -m "$info"
git push origin main