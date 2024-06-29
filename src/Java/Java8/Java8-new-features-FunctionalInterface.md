---
title: 函数式接口
index: 3
category: Java
tag:
  - Java8
---

## 1 函数式接口

在java8中为了让现在有的函数能够更加友好的使用Lambda表达式，引入了函数式接口这个概念，就是一个仅有一个抽象方法的普通接口。如果声明多个抽象方法则会报错，但是默认方法和静态方法在此接口中可以定义多个

要想自定义一个函数式接口的话，需要在接口上添加@FunctionInterface。

```java
@FunctionalInterface
public interface MyFunctionInterface {
    void exec();
}
```

下面看下使用，首先定义一个方法

```java
public void demo(MyFunctionInterface myFunctionInterface){
        myFunctionInterface.exec();
}
```

调用该方法

```java
demo(new MyFunctionInterface() {
    @Override
    public void exec() {
        System.out.println("Hello World");
    }
});
```

下面使用Lambda表达式

```java
demo(()-> System.out.println("Hello World"));
```

是不是非常简单

## 2 Java8引入的几个函数式接口

在Java8的类库设计中，已经引入了几个函数式接口：Predicate、Consumer、Function、Supplier。

### 2.1 Predicate使用

Predicate接口是Java8定义的一个函数式接口，属于java.util.function包下的，`用于进行判断操作`，内部定义一个抽象方法test，三个默认方法and、negate、or和一个静态方法isEqual。

下面我们来看下具体使用

```java
public static List<Student> filter(List<Student> studentList, Predicate<Student> predicate){
    List<Student> students = new ArrayList<>();
    studentList.forEach(s->{
        if(predicate.test(s)){
            students.add(s);
        }
    });
    return students;
}
```

如何调用filter方法呢

```java
List<Student> students = new ArrayList<>();
students.add(new Student(1,"zhangsan","W"));
students.add(new Student(2,"lisi","W"));
students.add(new Student(3,"wangwu","F"));

List<Student> f = filter(students, (s) -> s.getSex().equals("F"));
System.out.println(f);
```

`(s) -> s.getSex().equals("F")`实现的其实就是Predicate的抽象方法test

### 2.2 Consumer使用

Consumer也是java8提供的函数式接口，`用于进行获取数据的操作`，其内部定义了一个抽象方法accept、一个默认方法andThen。

```java
public static void foreach(List<Student> studentList, Consumer<Student> consumer){
    studentList.forEach(v -> consumer.accept(v));
}
```

调用foreach

```java
List<Student> students = new ArrayList<>();
students.add(new Student(1,"zhangsan","W"));
students.add(new Student(2,"lisi","W"));
students.add(new Student(3,"wangwu","F"));
foreach(students,(s)-> System.out.println(s));
```



### 2.3 Function使用

Function主要用于进行类型转换的操作。内部提供一个抽象方法，apply、两个默认方法compose、andThen、一个静态方法identity。

```java
public static Integer convert(String value, Function<String, Integer> converter) {
    return converter.apply(value);
}
```

调用convert方法

```java
String value = "666";
convert(value,v->Integer.parseInt(v));
```



### 2.4 Supplier使用

Supplier也是用来进行值获取操作，内部只有一个抽象方法get

```java
public static Integer getMin(Supplier<Integer> supplier){
    return supplier.get();
}
```

调用getMin方法

```java
int[] arr = new int[]{1,6,2,7,3};
getMin(()->{
    int min = arr[0];
    for (int i:arr){
        if (i < min){
            min = i;
        }
    }
    return min;
});
```

