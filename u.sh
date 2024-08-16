info=$1
if ["$info" = ""];
then info="feat:get city location id"
fi
git add -A
git commit -m "$info"
git push origin main