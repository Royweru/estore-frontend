const newObj ={
  student1:55,
  student2:33,
  student3:34,
  student4:45
}
console.log("Object before filter ",newObj)
const filtredObj=Object.fromEntries(Object.entries(newObj)
.filter(([key,val])=>val>34)
)
console.log("Object after filter ",filtredObj)