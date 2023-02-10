for i in {1..4}
do
  cp ../assets/0.json "../assets/$i.json"
  cp ../assets/0.jpg "../assets/$i.jpg"

  j=$((i+1))
  
  # Update the name attribute
  sed -i '' "s/AI or AMilz? no. 1/AI or AMilz? no. $j/g" "../assets/$i.json"

  # Update the "id" trait value
  sed -i '' "s/\"value\": \"1\"/\"value\": \"$j\"/g" "../assets/$i.json"

  # Update the "image" attribute
  sed -i '' "s/\"image\": \"0.jpg\"/\"image\": \"$i.jpg\"/g" "../assets/$i.json"

  # Update the "uri" attribute
  sed -i '' "s/\"uri\": \"0.jpg\"/\"uri\": \"$i.jpg\"/g" "../assets/$i.json"
done
