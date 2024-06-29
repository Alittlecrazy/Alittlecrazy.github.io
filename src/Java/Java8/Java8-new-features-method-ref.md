---
title: 方法引用
index: 4
category: Java
tag:
  - Java8
---





## 1.方法引用介绍

方法引用更进一步优化了Lambda的使用。它让代码感觉更加的自然。我们可以直接使用`::`来简化Lambda表达式的使用，语法如下

```markdown
类名或实例名::方法名
```



## 2.案例

我们来实现一下集合排序

```java
List<Student> students = new ArrayList<>();
students.add(new Student(1,"zhangsan","W"));
students.add(new Student(3,"lisi","W"));
students.add(new Student(2,"wangwu","F"));

students.sort((o1,o2)-> o1.getId().compareTo(o2.getId()));
System.out.println(students);
```

改造一下

```java
List<Student> students = new ArrayList<>();
students.add(new Student(1,"zhangsan","W"));
students.add(new Student(3,"lisi","W"));
students.add(new Student(2,"wangwu","F"));

//students.sort((o1,o2)-> o1.getId().compareTo(o2.getId()));

//Comparator.comparing((Student s) -> s.getId());//指定排序字段
students.sort(Comparator.comparing((Student s) -> s.getId()));

System.out.println(students);
```

下面用方法引用简化代码

```java
List<Student> students = new ArrayList<>();
students.add(new Student(1,"zhangsan","W"));
students.add(new Student(3,"lisi","W"));
students.add(new Student(2,"wangwu","F"));

//students.sort((o1,o2)-> o1.getId().compareTo(o2.getId()));

//Comparator.comparing((Student s) -> s.getId());//指定排序字段
students.sort(Comparator.comparing(Student::getId));

System.out.println(students);
```



