---
title: 收集器
index: 6
category: Java
tag:
  - Java8
---

## 1.概述

对于数据的返回，如果要做一些复杂的数据返回，应该怎么做呢？比如返回一个Map<String,Integer>或者Map<String,List<Object>>。那么对于这些内容，就需要通过收集器来实现了。

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));

//根据性别分组
Map<String, List<Student>> map = list.stream().collect(Collectors.groupingBy(Student::getSex));
System.out.println(map); 


```



