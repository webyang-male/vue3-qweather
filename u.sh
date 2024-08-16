info=$1
if ["$info" = ""];
then info="feat:get wather data ui beautufy"
fi
git add -A
git commit -m "$info"
git push origin main