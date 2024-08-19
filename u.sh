info=$1
if ["$info" = ""];
then info="feat:add hour weather chart in page"
fi
git add -A
git commit -m "$info"
git push origin main