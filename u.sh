info=$1
if ["$info" = ""];
then info="feat:The beta version of the weather project has been completed."
fi
git add -A
git commit -m "$info"
git push origin main