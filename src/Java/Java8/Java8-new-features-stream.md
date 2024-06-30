---
title: Stream流
index: 5
category: Java
tag:
  - Java8
---

## 1.概述

流操作是Java8提供的一个重要的新特性，它允许开发人员以声明性方式处理集合，其核心类库主要改进了对集合类的API和新增Stream操作。Stream类中的每一个方法都对应集合上的一种操作。将真正的函数式编程引入到Java中，能让代码更加简洁，极大地简化了集合的处理操作，以高了开发的效率和生产力。

同时Stream不是一种数据结构，它只是某种数据源的视图，数据源可以是一个数组，Java容器或I/O channel等。在Stream中的操作每一次都会产生新的流，内部不会像普通集合操作一样立刻获取值，而是惰性取值，只有等到用户真正需要结果的时候才会执行。

## 2.初体验

定义一个集合

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,28,"F","zhangsan"));
list.add(new Student(2,18,"M","lisi"));
list.add(new Student(3,38,"F","wangwu"));
list.add(new Student(4,78,"M","zhaoliu"));
```

查询年龄小于20的学生，并根据年龄进行排序，等到学生姓名，生成新的集合

```java
List<String> collect = list.stream().filter(s -> s.getAge() < 20)
        .sorted(Comparator.comparing(Student::getAge))
        .map(Student::getName)
        .collect(Collectors.toList());

System.out.println(collect);
```



## 3.流操作详解

Stream流接口中定义了许多对于集合的操作方法，总的来说可以分为两大类：中间操作和终端操作。

- 中间操作：会返回一个流，通过这种方式可以将多个中间操作连接起来，形成一个调用链，从而转换为另外一个流。除非调用链最后存在一个终端操作，否则中间操作对流不会进行任何结果处理。
- 终端操作：会返回一个具体的结果，如boolean、list、Integer等。

### 3.1筛选

对于集合的操作，经常性的会涉及到对于集合符合条件的数据筛选，Stream中对于数据筛选两个常见API：filter(过滤)、distinct(去重)

#### filter

该方法会接受一个返回boolean的函数作为参数，最终返回一个包括所有符合条件元素的流。

```java
//查询年龄小于20的学生
List<Student> collect = list.stream()
                .filter(s -> s.getAge() < 20)
                .collect(Collectors.toList());
```

#### distinct

在java7之前对集合中的内容去重，有多种的实现方式，如通过set去重、遍历后赋值给另一个集合

```java
//对数据%2后去重
List<Integer> numberList = Arrays.asList(1,4,5,6,4,8,9,8,10);
List<Integer> collect1 = numberList.stream()
        .filter(n -> n % 2 == 0)
        .distinct()
        .collect(Collectors.toList());
System.out.println(collect1);
```

### 3.2切片

#### limit

该方法会返回一个不超过给定长度的流

```java
List<Integer> numberList = Arrays.asList(1,4,5,6,4,8,9,8,10);
List<Integer> collect1 = numberList.stream()
        .limit(5)
        .collect(Collectors.toList());
System.out.println(collect1);

//输出结果
[1, 4, 5, 6, 4]
```



#### skip

刚才已经基于limit完成了数据截取，但是limit对于数据截取是从前往后截取几个。如果现在对于结果只获取后几个怎么办呢？此时就需要使用skip()。其与limit()的使用是相辅相成的。

```java
List<Integer> numberList = Arrays.asList(1,4,5,6,4,8,9,8,10);
List<Integer> collect1 = numberList.stream()
        .limit(5)
        .skip(2)
        .collect(Collectors.toList());
System.out.println(collect1);

//输出结果
[5, 6, 4]
```



### 3.3映射

在对集合操作的时候，我们经常会从某些对象中选择性的提取某些元素的值，就像编写sql一样，指定获取表中特定的数据列

```sql
#指定获取特定的列
SELECT NAME FROM STUDENT;
```

在Stream API中也提供了类似的方法，map()。它接收一个函数作为方法参数，这个函数会被应用到集合中每一个元素上，并最终将其映射为一个新的元素。

#### map

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));


List<String> collect = list.stream().map(Student::getName).collect(Collectors.toList());
System.out.println(collect);

//输出结果
[zhangsan, lisi, wangwu, zhaoliu]
```

### 3.4 匹配

在日常开发中，有时还需要判断集合中某些元素是否匹配对应的条件，如果有的话，在进行后续的操作。在Stream API中也提供了相关方法供我们进行使用，如anyMatch,allMatch等。它们对应的就是||和&&运算符。

#### 基于anyMatch()判断条件至少匹配一个元素

anyMatch()主要用于判断流中是否至少存在一个符合条件的元素，它会返回一个boolean值，并且对于它的操作，一般叫做短路求值

对于集合的一些操作，我们无需处理整个集合就能得到结果，比方说通过&&或者||连接一个判断条件，这个就是短路

对于流来说，某些操作不用操作整个流就可以得到结果。

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));


if (list.stream().anyMatch(s->s.getAge() < 20)){//集合中只要存在一个age<20的元素就返回true
    System.out.println("有符合条件的数据");
}
```

#### 基于allMatch()判断条件是否匹配所有元素

allMatch()的工作原理与anyMatch()类似，但是anyMatch执行时，只要流中有一个元素符合条件就会返回true,而allMatch会判断流中是否所有元素都符合条件，全部符合才会返回true。

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));


if (list.stream().allMatch(s->s.getAge() < 30)){
    System.out.println("所有学生都小于30");
}
```

### 3.5查找

对于集合操作，有时需要从集合中查找符合条件的元素，Stream中也提供可相关的API，findAny()和findFirst(),它俩可以与其他流操作组合使用。findAny用于获取流中随机的某一个元素，findFirst用于获取流中的第一个元素。至于一些特别的定制化需求，则需要自行实现。

#### 基于findAny查找元素

findAny用于获取流中随机的某一个元素，并且利用短路在找到结果时，立即结束。

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));


Optional<Student> any = list.stream().filter(s -> s.getAge() < 20).findAny();
if (any.isPresent()) {
    System.out.println(any.get());
}
```

这里如果时串行流的话，还是只会取第一个元素，如果是并行流才会真正的随机。

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));


Optional<Student> any = list.parallelStream().filter(s -> s.getAge() < 20).findAny();
if (any.isPresent()) {
    System.out.println(any.get());
}
```

#### 基于findFirst查找元素

findFirst使用原理与FindAny类似，但不管是并行还是串行，都返回流中的第一个元素。

```java
List<Student> list = new ArrayList<>();
list.add(new Student(1,18,"F","zhangsan"));
list.add(new Student(2,11,"M","lisi"));
list.add(new Student(3,26,"F","wangwu"));
list.add(new Student(4,28,"M","zhaoliu"));


Optional<Student> any = list.parallelStream().filter(s -> s.getAge() < 20).findFirst();
if (any.isPresent()) {
    System.out.println(any.get());
}
```



### 3.6规约

截至到现在，对于流的终端操作，我们返回的有boolean、Optional和List。但是在集合操作中，我们经常会设计对元素进行统计计算之类的操作，如求和、求最大值、最小值等，从而返回不同的数据结果。

#### 基于reduce()进行累积求和

```java
List<Integer> numbers = new ArrayList<>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);
numbers.add(5);
numbers.add(6);
numbers.add(7);

numbers.stream().reduce((a,b)->a+b).ifPresent(System.out::println);
```

优化

```java
List<Integer> numbers = new ArrayList<>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);
numbers.add(5);
numbers.add(6);
numbers.add(7);

numbers.stream().reduce(Integer::sum).ifPresent(System.out::println);
```



#### 获取最大值max

```java
List<Integer> numbers = new ArrayList<>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);
numbers.add(5);
numbers.add(6);
numbers.add(7);

numbers.stream().max(Integer::compareTo).ifPresent(System.out::println);
```

#### 回去最小值min

```java
List<Integer> numbers = new ArrayList<>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);
numbers.add(5);
numbers.add(6);
numbers.add(7);

numbers.stream().min(Integer::compareTo).ifPresent(System.out::println);
```

