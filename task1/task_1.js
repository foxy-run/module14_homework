const parser = new DOMParser;
//console.log(parser);
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
// console.log(xmlString);

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
// console.log(xmlDOM);
const listNode = xmlDOM.querySelector("list");
const studentNode = listNode.querySelectorAll("student");
const result = {
  list: []
};

studentNode.forEach(element => {
  const student = new Object();
  const nameNode = element.querySelector("name");
  const firstNameNode = element.querySelector("first");
  const secondNameNode = element.querySelector("second");
  const ageNode = element.querySelector("age");
  const profNode = element.querySelector("prof");
  const langAttribute = nameNode.getAttribute("lang");

  student.name = firstNameNode.textContent + ' ' + secondNameNode.textContent;
  student.age = Number(ageNode.textContent);
  student.prof = profNode.textContent;
  student.lang = langAttribute;
  result.list.push(student);
});

console.log(result);