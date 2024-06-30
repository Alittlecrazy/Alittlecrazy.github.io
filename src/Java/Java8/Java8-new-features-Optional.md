---
title: Optional
index: 7
category: Java
tag:
  - Java8
---



## 1.简介

为了防止空指针异常的出现，Java8中引入了一个新类Optional，对于它之前我们已经进行了简单的实现。其本质就是通过Optional类对值进行封装，当有值的时候，会把该值封装到Optional类中。如果没有值的话，则会在该类封装一个Empty。

### 1.1 创建Optional对象

要创建Optional，该类提供了三种方法操作，分别为：empty()、of()、ofNullable()。使用方式如下所示：

```java
Student student = new Student(1, 18, "M", "zhangsan");
Optional<Student> optional = Optional.empty();
Optional<Student> optional2 = Optional.of(student);
Optional<Student> optional3 = Optional.ofNullable(student);
```

