info=$1
if ["$info" = ""];
then info="update:get wather data"
fi
git add -A
git commit -m "$info"
git push origin main