## 前端项目结构

### 1. 总体结构
![](./screenshots/dir.png)

+ components: 项目具体模块
+ entities：自定义的一些对象，主要用于页面间数据传输以及与后端交互
+ services：处理项目逻辑，与后端交互

### 2. 具体说明

#### 2.1 components
![](./screenshots/components.png)

+ add-course：添加课程
+ add-project：添加项目
+ add-user：添加用户
+ course-details：课程主页
+ course-list：课程列表
+ edit-profile：修改个人信息
+ footer：页脚
+ login：用户登录
+ profile：用户个人信息
+ project-detail：项目主页
+ register：用户注册
+ top-bar：导航栏
+ user-management：用户管理
+ dialogs：弹窗    
![](./screenshots/dialogs.png)
   + add-task-dialog：添加任务弹窗
   + course-detail-dialog：课程详情弹窗
   + create-discussion-dialog：添加讨论弹窗
   + project-detail-dialog：项目详情弹窗
   + score-dialog：老师评分弹窗
   + upload-file-dialog：上传文件弹窗
   + user-detail-dialog：用户详情弹窗

#### 2.2 entities
![](./screenshots/entities.png)
+ CourseInfo：课程详情
+ ProjectFile：项目文件管理中的文件
+ ProjectInfo：项目详情
+ RReponse：后端返回数据
+ Student：学生用户详情
+ Teacher：教师用户详情

#### 2.3 services
![](./screenshots/services.png)
+ course.service：完成与课程管理相关操作的后端交互，如创建课程，删除课程，获取课程信息等
+ discussion.service：完成与讨论管理相关操作的后端交互，如创建讨论，添加回复，获得项目讨论列表等
+ file.service：完成与文件管理相关的相关操作的后端交互，如上传文件，删除文件等
+ project.service：完成与项目管理相关的相关操作的后端交互，如创建项目，删除项目，获取项目信息等
+ session.service：完成 session 相关操作
+ task.service：完成与任务管理相关操作的后端交互，如创建任务，获取任务信息等
+ user.service：完成用户管理相关操作的后端交互，如登录，注册，获取用户信息等
+ user-management.service：完成管理员对用户管理的相关操作的后端交互，如创建用户，删除用户等

## 后端接口说明

### 1. 用户相关

#### 1.1 登录
接口示例：/pbl/user/login?type=student&username=17300&password=123456

返回数据：    
![](./screenshots/ilogin.png)

#### 1.2 注册、添加用户
学生可以注册也可以管理员添加。老师只能管理员添加。管理员不可注册不可添加，默认用户名 root,密码 123456）
![](./screenshots/iregister.png)

#### 1.3 管理员删除用户
![](./screenshots/idelete.png)
![](./screenshots/ideleteres.png)

#### 1.4 获取所有学生用户信息（返回所有学生）
url示例: /pbl/user/getUsers

#### 1.5 获取所有教师用户信息（返回所有教师）
url示例: /pbl/user/getTeachers

#### 1.6 更新用户信息
![](./screenshots/iupdateuser.png)

#### 1.7 根据用户ID返回用户信息
url示例：/pbl/user/getUserByID/student/17300

返回数据： 
![](./screenshots/ilogin.png)

### 2. 课程相关

#### 2.1 获取课程信息

管理员获得所有课程：
![](./screenshots/allcourse.png)

学生获得自己选的课程：
![](./screenshots/stucourse.png)

老师获得自己教授课程：
![](./screenshots/teacourse.png)

#### 2.2 根据课程编码获得课程信息
![](./screenshots/singlecourse.png)

#### 2.3 学生加入课程
![](./screenshots/joincourse.png)

#### 2.4 管理员或教师删除课程
![](./screenshots/deletecourse.png)

#### 2.5 管理员或教师新建课程
![](./screenshots/addcourse.png)

#### 2.6 更新课程信息
可以改course_name, course_time, exam_time, descs, teacher_id
![](./screenshots/updatecourse.png)

### 3. 项目相关

#### 3.1 新建项目
![](./screenshots/addpj.png)

#### 3.2 更新项目信息
![](./screenshots/updatepj.png)

#### 3.3 获取项目信息
![](./screenshots/getpj.png)

#### 3.4 删除项目
![](./screenshots/deletepj.png)

#### 3.5 获取任务信息
![](./screenshots/gettask.png)

#### 3.6 新建任务
![](./screenshots/newtask.png)

#### 3.7 获取讨论
![](./screenshots/getdis.png)

#### 3.8 新建讨论
![](./screenshots/adddis.png)

#### 3.9 获取某个讨论的回复
![](./screenshots/getreply.png)

#### 3.10 回复讨论
![](./screenshots/reply.png)

#### 3.11 上传文件弹窗
接口实例：/pbl/file/upload

#### 3.12 删除文件等
接口实例：/pbl/file/delete/{file_id}

#### 3.13 获取文件列表
![](./screenshots/filelist.png)


## 关键功能实现

### 1. 文件上传与保存（包括用户头像管理，项目文件管理）

#### 1.1 前端部分

在包含文件上传的表单的 form 标签中添加 `enctype="multipart/form-data"` 属性，指定传输数据为二进制数据。      
![](./screenshots/ency.png)

注册上传文件的 input 标签的 (change) 函数，当用户选择文件后，对文件信息进行获取。
![](./screenshots/change.png)
![](./screenshots/preview.png)

创建 FormData 对象，将文件信息以及其他信息保存到 FormData 对象中传给后端。
![](./screenshots/formdata.png)

#### 1.2 后端部分

在 .properties 文件中添加文件上传路径以及对外暴露静态资源访问路径
![](./screenshots/properties.png)

在启动类中配置文件上传的路径
![](./screenshots/multi.png)

编写对应接口方法
![](./screenshots/interface.png)

对文件信息进行处理，包括为文件重命名，以及将文件从临时文件夹中上传到服务器
![](./screenshots/rename.png)
![](./screenshots/transfer.png)

这样文件被保存到设定好的上传路径中，通过 `服务器ip地址:端口号+对外暴露静态资源访问路径(/files/)+文件路径` 即可访问到文件
![](./screenshots/img.png)

## 项目部署

### 1. 部署过程

#### 1.1 前端部署

将项目用 `ng build` 命令打包，生成的 dist 文件夹即为打包的结果
![](./screenshots/build.png)
![](./screenshots/dist.png)

将文件夹拷贝到服务器的 tomcat 的 webapps 文件夹中
![](./screenshots/copy.png)

启动 tomcat ，则前端部署完成，可以通过 `ip地址:tomcat端口号/dist/pbl` 访问前端页面
![](./screenshots/login.png)

#### 1.2 后端部署

**方式一：将项目打包为 jar 包直接部署**

首先通过 maven 项目的 package 命令将项目打包成 jar 包
![](./screenshots/package.png)    
![](./screenshots/package_success.png)     

然后将项目拷贝到服务器上，使用 `nohup java -jar demo-0.0.1-SNAPSHOT.jar >> demo.out &` 命令，使其不挂断地运行，后端部署完成。
![](./screenshots/run.png)  

**方式二：使用Docker部署**

安装 Docker CE，检查是否安装成功
![](./screenshots/docker_hello.png)


### 2. 部署中遇到的问题

#### 2.1 前端部署完成后，访问项目页面显示空白

解决方法：
项目打包后生成的“dist”文件夹目录下的“index.html”中基准地址为`<base href="/">`，修改为相对路径`<base href="./">`即可。
![](./screenshots/html.png)

#### 2.2 页面刷新后404

解决方法：在 app.module.ts 中引入以下模块：    
![](./screenshots/404way1.png)

然后在 providers 中加入以下代码：     
![](./screenshots/404way2.png)

这样在访问angular站点时，根节点后面会自动生成一个 # 锚点。经过重新打包和部署后，再次刷新该页面就不会报错。
![](./screenshots/404solve.png)

#### 2.3 文件上传路径问题

在部署到服务器后，当后端处理上传文件时会报错，找不到存储文件的路径
![](./screenshots/tmp.png)

解决方法：手动设置 tomcat 的根路径
![](./screenshots/tomcat_base.png)

