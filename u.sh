info=$1
if ["$info" = ""];
then info="feat:Beautification of the style of the living index"
fi
git add -A
git commit -m "$info"
git push origin main