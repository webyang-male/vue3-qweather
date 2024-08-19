info=$1
if ["$info" = ""];
then info="feat:finished data of the living index page"
fi
git add -A
git commit -m "$info"
git push origin main