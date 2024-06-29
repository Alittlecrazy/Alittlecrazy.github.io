---
title: 接口定义
index: 1
category: Java
tag:
  - Java8
---

## 1. 定义一个接口及实现

我们知道，定义一个接口里面的方法是没有方法体的，需要实现类去实现。

下面我们先定义一个接口

```java
public interface MyService {
    void doSomething();
}
```

定义接口实现

```java
public class MyServiceImpl implements MyService{
    @Override
    public void doSomething() {
        System.out.println("exec doSomething");
    }
}
```

## 2. 定义默认实现

在Java8中，定义一个接口，里面的方法可以有方法体，定义一个默认的实现，具体定义方法如下

```java
public interface MyService {
    void doSomething();
    default void doSomethingDefault() {//定义方法默认实现
        System.out.println("exec doSomethingDefault");
    }
}
```

这个用`default`关键字就可以定义一个默认实现，实现类可以不用强制实现该方法，不过实现类也可以对此方法进行重写。

## 3. 静态方法的默认实现

静态方法的定义方式可以如下定义

```java
public interface MyService {
    void doSomething();
    default void doSomethingDefault() {//定义方法默认实现
        System.out.println("exec doSomethingDefault");
    }

    static void doSomethingDefaultStatic(){//静态方法默认实现
        System.out.println("exec doSomethingDefaultStatic");
    }
}
```

对于静态方法的默认实现，方法前加上`static`关键字就可以了，在调用的时候直接用接口去调用，如下

```java
MyService.doSomethingDefaultStatic();
```



## 4.总结

java8可以定义接口方法的默认实现，对于一些逻辑比较简单的方法，可以直接在接口中定义默认实现。