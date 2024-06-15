---
title: 密钥库和证书管理工具keytool
index: 1
category: Java
tag:
  - Java可执行命令
---

## 1 概念
Java的keytool命令是用于管理和操作Java密钥库(KeyStore)的工具。它的设计目的是为了方便Java开发人员生成、管理和操作数字证书，以及实现对保护资源进行安全访问的加密和身份验证。  

> [!tip]
> 密钥库（KeyStore）：它是存储密钥和证书的容器，可以包含私钥、公钥、受信任的证书和根证书等；  
> 密钥对（Key Pair）：一对相关联的密钥，包括私钥和相应的公钥；  
> 数字证书（Digital Certificate）：由证书颁发机构（CA）签发的包含公钥信息和持有者身份信息的被数字签名的文件。  

`keytool`命令可以用于：生成和管理密钥对和数字证书、导入和导出密钥库中的密钥和证书、列出密钥库中的密钥和证书信息、签发和验证数字证书、支持使用多种加密算法和密钥长度。  
`keytool`命令底层使用Java提供的密钥库相关API实现。它可以与不同类型的密钥库进行交互，并提供了对密钥和证书的生成、导入、导出、签发、验证等功能。具体的实现原理涉及到与密钥库格式和加密算法相关的细节。  

## 2 优点和缺点

**优点**
* 方便地生成和管理密钥对和数字证书；
* 提供了强大的加密和认证功能，确保数据的安全性和完整性；
* 支持多种加密算法和密钥长度，提供灵活性；
* 支持多种不同类型的密钥库（例如JKS、PKCS12等）进行存储和操作。

**缺点**
* 命令行界面较为复杂，需要熟悉其语法和参数。需要对密钥和证书的概念有一定的理解，才能正确使用和操作。

## 3 使用
### 3.1 语法格式

以下是keytool命令的基础语法：  
```shell
keytool [-command_name] [命令] [参数]
```
其中，`-command_name` 表示各种不同操作类型命令，`[命令] [参数]`则表示具体某种 `-command_name` 操作的可选参数。将 `keytool` 支持的各种操作命令汇总如下：  

|       命令        |              说明              |
| :---------------: | :----------------------------: |
|  **`-certreq`**   |        **生成证书请求**        |
|   -changealias    |         更改条目的别名         |
|      -delete      |            删除条目            |
| **`-exportcert`** |          **导出证书**          |
| **`-genkeypair`** |         **生成密钥对**         |
|    -genseckey     |            生成密钥            |
|     -gencert      |      根据证书请求生成证书      |
| **`-importcert`** |      **导入证书或证书链**      |
|    -importpass    |            导入口令            |
|  -importkeystore  | 从其他密钥库导入一个或所有条目 |
|    -keypasswd     |       更改条目的密钥口令       |
|    **`-list`**    |     **列出密钥库中的条目**     |
|    -printcert     |          打印证书内容          |
|   -printcertreq   |       打印证书请求的内容       |
|     -printcrl     |      打印 CRL 文件的内容       |
|   -storepasswd    |      更改密钥库的存储口令      |

从上边信息可以看到， `keytool `命令对于密钥对、证书、密钥库的各种操作支持是比较全面的，下面主要介绍一些常用的命令操作：

- `-certreq`：生成证书请求；
- `-exportcert`：导出证书；
- `-genkeypair`：生成密钥对；
- `-importcert`：导入证书或证书链；
- `-list`：列出密钥库中的条目。

对于未介绍到的命令，可以使用 “`keytool -command_name -help`” 获取该 `command_name` 对应命令的用法。

### 3.2 生成证书请求：keytool -certreq

**`keytool -certreq` 命令用于生成证书请求（Certificate Signing Request，CSR），以便将其发送给证书颁发机构（CA）以获取受信任的数字证书**。

用法为：

```shell
keytool -certreq [OPTION]...
```

其中，`[OPTION]`表示可选参数，所有参数汇总如下：

|      参数      |          说明          |
| :------------: | :--------------------: |
|     -alias     |   要处理的条目的别名   |
|    -sigalg     |      签名算法名称      |
|     -file      |       输出文件名       |
|    -keypass    |        密钥口令        |
|   -keystore    |       密钥库名称       |
|     -dname     |       唯一判别名       |
|   -storepass   |       密钥库口令       |
|   -storetype   |       密钥库类型       |
| -providername  |       提供方名称       |
| -providerclass |       提供方类名       |
|  -providerarg  |      提供方类路径      |
|       -v       |        详细输出        |
|   -protected   | 通过受保护的机制的口令 |

以下是一个使用示例：

```Shell
keytool -certreq -alias myalias -file csrfile.csr -keystore mykeystore.jks
```

在这个命令中，-certreq 参数表示生成证书请求，并且需要提供别名（myalias）、输出文件路径（csrfile.csr）和密钥库路径（mykeystore.jks）。

执行上述命令，keytool 工具将会根据给定的别名和密钥库，生成一个证书请求文件（CSR）。该文件包含密钥对中的公钥和相关的身份信息，如国家、组织和通用名称等。CSR 可以被发送到证书颁发机构用于签发数字证书。

通过使用 keytool -certreq 命令，可以轻松地创建证书请求，以便获得由CA签发的受信任的数字证书。这是建立与外部实体的信任关系、进行安全通信和身份验证的重要步骤。



### 3.3 导出证书：keytool -exportcert

**`keytool -exportcert` 命令用于从密钥库（KeyStore）中导出数字证书。**

用法为：

```shell
keytool -exportcert [OPTION]...
```

其中，`[OPTION]`表示可选参数，所有参数汇总如下：

|      参数      |          说明          |
| :------------: | :--------------------: |
|      -rfc      |    以 RFC 样式输出     |
|     -alias     |   要处理的条目的别名   |
|     -file      |       输出文件名       |
|   -keystore    |       密钥库名称       |
|   -storepass   |       密钥库口令       |
|   -storetype   |       密钥库类型       |
| -providername  |       提供方名称       |
| -providerclass |       提供方类名       |
|  -providerarg  |       提供方参数       |
| -providerpath  |      提供方类路径      |
|       -v       |        详细输出        |
|   -protected   | 通过受保护的机制的口令 |

以下是使用示例和作用说明：

```shell
keytool -exportcert -alias myalias -file certfile.cer -keystore mykeystore.jks
```

在这个命令中，-exportcert 参数表示导出证书，并且需要提供别名（myalias）、输出文件路径（certfile.cer）和密钥库路径（mykeystore.jks）。

执行上述命令，keytool 工具将会根据给定的别名和密钥库，导出指定别名（myalias）对应的数字证书，并保存为一个 .cer 文件（例如 certfile.cer）。导出的证书文件可以被用于与其他实体进行安全通信、身份验证等操作。

通过使用 keytool -exportcert 命令，可以方便地从密钥库中导出数字证书，以便与其他实体共享或使用。这有助于建立可靠的信任关系和确保安全通信。


### 3.4 生成密钥对：keytool -genkeypair

**`keytool -genkeypair` 命令用于生成密钥对（Key Pair），包括私钥和相应的公钥，并将其存储到密钥库中。**

用法为：

```Shell
keytool -genkeypair [OPTION]...
```

其中，`[OPTION]`表示可选参数，所有参数汇总如下：

|      参数      |          说明           |
| :------------: | :---------------------: |
|     -alias     |   要处理的条目的别名    |
|    -keyalg     |      密钥算法名称       |
|    -keysize    |       密钥位大小        |
|    -sigalg     |      签名算法名称       |
|   -destalias   |        目标别名         |
|     -dname     |       唯一判别名        |
|   -startdate   | 证书有效期开始日期/时间 |
|      -ext      |       X.509 扩展        |
|   -validity    |        有效天数         |
|    -keypass    |        密钥口令         |
|   -keystore    |       密钥库名称        |
|   -storepass   |       密钥库口令        |
|   -storetype   |       密钥库类型        |
| -providername  |       提供方名称        |
| -providerclass |       提供方类名        |
|  -providerarg  |       提供方参数        |
| -providerpath  |      提供方类路径       |
|       -v       |        详细输出         |
|   -protected   | 通过受保护的机制的口令  |

以下是使用示例和作用说明：

```shell
keytool -genkeypair -alias myalias -keypass mypassword -keystore mykeystore.jks
```

在这个命令中，-genkeypair 参数表示生成密钥对，并且需要提供别名（myalias）、密钥密码（mypassword）以及密钥库路径（mykeystore.jks）。

执行上述命令，keytool 工具将根据指定的别名和密钥库路径，生成一个新的密钥对，并将其存储到密钥库中。密钥对通常由一个用于加密的私钥和一个用于解密的公钥组成。

通过使用 keytool -genkeypair 命令，就可生成密钥对并将其存储到密钥库中，用于进行加密、身份验证和安全通信等操作。 并且 keytool 还提供其他选项和参数，例如可以使用 -storepass 选项来指定密钥库的密码，以及可以使用 -keysize 参数来指定密钥的长度。



### 3.5 导入证书或证书链：keytool -importcert

**`keytool -importcert` 命令用于导入数字证书到特定的密钥库中。** 用法为：

```shell
keytool -importcert [OPTION]...
```

其中，`[OPTION]`表示可选参数，所有参数汇总如下：

|    **参数**    |        **说明**         |
| :------------: | :---------------------: |
|   -noprompt    |         不提示          |
| -trustcacerts  | 信任来自 cacerts 的证书 |
|   -protected   | 通过受保护的机制的口令  |
|     -alias     |   要处理的条目的别名    |
|     -file      |       输入文件名        |
|    -keypass    |        密钥口令         |
|   -keystore    |       密钥库名称        |
|   -storepass   |       密钥库口令        |
|   -storetype   |       密钥库类型        |
| -providername  |       提供方名称        |
| -providerclass |       提供方类名        |
|  -providerarg  |       提供方参数        |
| -providerpath  |      提供方类路径       |
|       -v       |        详细输出         |

以下是使用示例和作用说明：

```shell
keytool -importcert -alias myalias -file certfile.cer -keystore mykeystore.jks
```

在这个命令中，-importcert 参数表示导入证书，并且需要提供别名（myalias）、要导入的证书文件路径（certfile.cer）以及目标密钥库路径（mykeystore.jks）。

执行上述命令后，keytool 工具将根据给定的文件路径，导入指定文件（例如 certfile.cer）中的数字证书，并存储到密钥库中。导入的数字证书将可用于建立信任关系、进行安全通信和身份验证等操作。

通过使用 keytool -importcert 命令，可以方便地将数字证书导入到指定的密钥库中，并集中管理应用程序所需的所有证书。



### 3.6 列出密钥库中条目：keytool -list

**`keytool -list` 命令用于列出密钥库中的证书、私钥以及其他相关信息。** 用法为：

```shell
keytool -list [OPTION]...
```

其中，`[OPTION]`表示可选参数，所有参数汇总如下：

|      参数      |          说明          |
| :------------: | :--------------------: |
|      -rfc      |    以 RFC 样式输出     |
|     -alias     |   要处理的条目的别名   |
|   -keystore    |       密钥库名称       |
|   -storepass   |       密钥库口令       |
|   -storetype   |       密钥库类型       |
| -providername  |       提供方名称       |
| -providerclass |       提供方类名       |
|  -providerarg  |       提供方参数       |
| -providerpath  |      提供方类路径      |
|       -v       |        详细输出        |
|   -protected   | 通过受保护的机制的口令 |

以下是使用示例和作用说明：

```shell
keytool -list -keystore mykeystore.jks
```

在这个命令中，-list 参数表示列出密钥库中的内容，并且需要提供密钥库路径（mykeystore.jks）。

执行上述命令后，keytool 工具将会显示指定密钥库（例如 mykeystore.jks）中的证书、私钥以及其他相关信息，如别名、创建日期等。

通过使用 keytool -list 命令，可以方便地查看和验证密钥库中的内容，以确保正确配置和管理数字证书和私钥。

## 应用场景

keytool命令在以下场景中发挥重要作用：

- 数字证书的生成和管理，用于验证身份和确保通信安全性；
- 密钥对的生成和管理，用于进行加密和解密操作；
- 密钥库的创建和管理，用于存储和保护密钥和证书；
- 签发数字证书请求和导入CA签发的证书。



## 使用技巧

- 学习并熟悉`keytool`命令的基础语法和常见选项，确保正确使用；
- 使用合适的算法和密钥长度进行生成和管理密钥对；
- 为每个实体（应用程序、用户等）使用不同的别名，以便更好地进行识别和管理；
- 定期备份和导出密钥库，以防止密钥丢失或损坏；
- 注意设置和保护密钥库的密码，并定期更改密码。



## 总结

Java的keytool命令是一个强大而灵活的工具，用于生成、导入、导出和管理密钥对和数字证书。它为Java开发人员提供了一种安全可靠的方式来保护应用程序和数据资源。

通过遵循合适的使用和操作方法，可以确保密钥和证书的安全性和完整性。有充分的理解和掌握keytool命令，可以更好地进行加密、身份验证和数据保护，并在安全意识和实践中取得成功。



## 参考



<https://lst66.blog.csdn.net/article/details/131518523>
