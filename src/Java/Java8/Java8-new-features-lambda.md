---
title: lambda表达式
index: 2
category: Java
tag:
  - Java8
---

## 1. 代码演进

首先我们先看一个需求，根据特定条件查询学生信息，例如根据名字，根据学生id等，这个需求很简单吧，话不多说，直接开干

先定义一个学生类Student

```java
public class Student {
    private Integer id;
    private String name;
    private String sex;

    public Student(Integer id, String name, String sex) {
        this.id = id;
        this.name = name;
        this.sex = sex;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                '}';
    }
}
```

下面定义一个查询方法

```java
    public static Student getStudentInfo(List<Student> studentList){
        for(Student student : studentList){
            if ("张三".equals(student.getName())){
                return student;
            }
            if ("李四".equals(student.getName())){
                return student;
            }
            if ("王五".equals(student.getName())){
                return student;
            }
        }
        return null;
    }
```

这个方法可以根据名字查询出对应的学生信息，但是存在一个问题，代码中存在大量硬编码，张三、李四、王五都是写死的，如果还要查询其他学生，还要再加if判断，显然这不是一个好方法，对于这个问题，下面把这个方法稍加改造

```java
    public static Student getStudentInfo(List<Student> studentList, String name){
        for(Student student : studentList){
            if (name.equals(student.getName())){
                return student;
            }
        }
        return null;
    }
```

可以看到，这里把名字作为方法形参传入，这样可以解决写大量if语句的问题，但是现在又存在一个问题，那如果现在要通过性别去查学生信息了呢？你可能会说，那还不简单，再定义一个方法，方法如下

```java
    public static Student getStudentInfo(List<Student> studentList, String sex){
        for(Student student : studentList){
            if (sex.equals(student.getSex())){
                return student;
            }
        }
        return null;
    }
```

这里功能倒是实现了，这样一来，如果再通过别的条件去查询，还要再定义一个方法，现在还是很麻烦，对于这种情况，我们还是可以通过传入一个方法形参的方式，去判断到底是通过什么条件获取信息，具体实现如下

```java
    public static Student getStudentInfo(List<Student> studentList, String value,String flag){
        for(Student student : studentList){
            if ("name".equals(flag)){
                if (value.equals(student.getName())){
                    return student;
                }
            }
            if ("Sex".equals(flag)){
                if (value.equals(student.getSex())){
                    return student;
                }
            }

        }
        return null;
    }
```

这段代码我们可以看到，通过传入具体的值和要查询的类型，可以解决上面的问题，但是代码可读性太差，调用者根本不知道如何去传参，需要看到方法里面的具体实现才知道该如何去传参，而且还是需要大量的if判断，那应该如何去解决呢？下面我们可以基于抽象的思想，定义一个接口，定义一个抽象方法，让不同的类去实现抽象方法，具体实现如下

首先，定义一个接口

```java
public interface StudentService {
    Student getStudentInfo(List<Student> studentList,Student student);
}
```

定义接口实现，根据名字查询

```java
public class StudentNameServiceImpl implements StudentService{
    @Override
    public Student getStudentInfo(List<Student> studentList, Student student) {
        for (Student s : studentList) {
            if (student.getName().equals(s.getName())) {
                return s;
            }
        }
        return null;
    }
}
```

根据性别查询

```java
public class StudentSexServiceImpl implements StudentService{
    @Override
    public Student getStudentInfo(List<Student> studentList, Student student) {
        for (Student s : studentList) {
            if (student.getSex().equals(s.getSex())) {
                return s;
            }
        }
        return null;
    }
}
```

这样我们需要根据什么条件查询，就用什么实现类去查询即可，但是这里存在的问题是，需要定义非常多的实现类，显然还是很啰嗦，下面我们可以用匿名类的方法，去优化该方案

```java
        StudentService studentService = new StudentService() {
            @Override
            public Student getStudentInfo(List<Student> studentList, Student student) {
                for (Student s : studentList) {
                    if (student.getName().equals(s.getName())) {
                        return s;
                    }
                    if (student.getSex().equals(s.getSex())) {
                        return s;
                    }
                }
                return null;
            }
        };
```

这样就不用去定义大量的实现类了，但是匿名类有个问题，阅读困难。

至此，我们用了大量的方案去实现查询学生信息的需求，但是最终还是觉得不完美，下面就该今天的主角java8的lambda登场啦！

## 2.Lambda表达式介绍

Lambda表达式是java8非常重要的一个新特性，其基于函数式编程的思想，支持将代码作为方法参数进行使用。可以把Lambda表达式理解为通过一种更加简洁的方式表示可传递的匿名函数。

它本身没有名称，而且不像方法一样属于某个类，但是可以有参数列表，方法体和返回值，使用Lambda表达式之后就不用去写匿名类了。

### 2.1使用规范

lambda基本格式

```java
(参数列表) -> {
    方法体
}
```

参数列表：即匿名方法的形参。

->：lambda运算符

方法体：用于执行业务逻辑。可以是单一语句，也可以是语句块，如果是单一语句可以省略花括号。当有返回值的时候，并且方法体只有一条语句，可以省略return，会自动根据结果返回。

1. 没有参数的lambda表达式

   ```java
   ()->new Student();
   ```

2. 只有一个参数的lambda表达式

   ```java
   x -> {
       Student s = new Student();
       return s;
   }
   ```

3. 有多个参数的lambda表达式

   ```java
   (int x,int y) -> {
       int z = x + y;
       return z;
   }
   ```

   上面方法可以简写，jvm可以根据上下文推断出参数类型

   ```java
   (x,y) -> {
       int z = x + y;
       return z;
   }
   ```



### 2.2与旧方法使用对比

1. 集合遍历

   定义一个List

   ```java
   String[] strings = new String[]{"Java","Python","C++"};
   List<String> list = Arrays.asList(strings);
   ```

   旧方式遍历

   ```java
   for(String s : list){
       System.out.println(s);
   }
   ```

   Lambda表达式遍历

   ```java
   list.forEach((value)->System.out.println(value));
   ```

2. 替换匿名内部类

   Runnable接口旧方式

   ```java
   Runnable runnable = new Runnable() {
       @Override
       public void run() {
           System.out.println("Hello World");
       }
   };
   ```

   Lambda表达式

   ```java
   Runnable runnable = () -> System.out.println("Hello World");
   ```

3. 集合排序

   原来的方式

   ```java
   Arrays.sort(language,new Comparator<String>() {
       @Override
       public int compare(String o1, String o2) {
           return o1.compareTo(o2);
       }
   });
   ```

   Lambda表达式

   ```java
   Arrays.sort(languages,(o1,o2)->o1.compareTo(o2));
   ```









