info=$1
if ["$info" = ""];
then info="feat:get city weather indices Data"
fi
git add -A
git commit -m "$info"
git push origin main