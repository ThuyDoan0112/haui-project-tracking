export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'vi',
  globalInjection: true,
  messages: {
    en: {
      login: {
        title: 'Welcome back',
        label: {
          email: 'Email',
          password: 'Password',
          submit: 'Continue'
        },
        error: {
          email: 'Email is required',
          password: 'Password is required'
        },
        message: {
          success: 'Login success',
          error: 'Login failed'
        }
      },
      sidebar: {
        title: 'HaUI Project Tracking',
        item: {
          'home': 'Home',
          'dashboard': 'Dashboard',
          'users': 'Users',
          'classes': 'Classes',
          'documents': 'Documents',
        },
        userDropdown: {
          item: {
            'logout': 'Logout'
          },
          text: {
            login: 'Signed in as',
          }
        }
      },
      home: {
        title: 'My Classes',
        message: "You don't have any classes yet!"
      },
      class: {
        tab: {
          students: 'Students',
          documents: 'Documents',
        },
        students: {
          title: 'Students & Projects',
          description: 'Students',
          name: 'Name',
          email: 'Email',
          studentCode: 'Student code',
          project: 'Project',
          report: 'Report',
          message: 'Create reports successfully',
          progress: 'Progress',
          uploadStudentsModal: {
            title: 'Add students and projects',
            label: 'File',
            helper: 'Only accept excel file',
            error: 'File is required',
            cancel: 'Cancel',
            save: 'Save',
          },
          createReportModal: {
            title: 'Create new report',
            name: 'Report name',
            description: 'Report description',
            startDate: 'Start date',
            dueDate: 'Due date',
            cancel: 'Cancel',
            save: 'Save',
          }
        }
      },
      dashboard: {
        users: {
          title: 'Users',
          name: 'Name',
          email: 'Email',
          role: 'Role',
          message: 'Create user successfully',
          createModal: {
            title: 'Create new user',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            role: 'Role',
            cancel: 'Cancel',
            save: 'Save',
            required: 'This field is required'
          },
        }
      }
    },
    vi: {
      login: {
        title: 'Đăng nhập',
        label: {
          email: 'Email',
          password: 'Mật khẩu',
          submit: 'Tiếp tục'
        },
        error: {
          email: 'Email không được để trống',
          password: 'Mật khẩu không được để trống'
        },
        message: {
          success: 'Đăng nhập thành công',
          error: 'Đăng nhập thất bại'
        }
      },
      sidebar: {
        title: 'Quản lý đồ án HaUI',
        item: {
          'home': 'Trang chủ',
          'dashboard': 'Bảng điều khiển',
          'users': 'Quản lý người dùng',
          'classes': 'Quản lý lớp học',
          'documents': 'Quản lý tài liệu',
        },
        userDropdown: {
          item: {
            'logout': 'Đăng xuất'
          },
          text: {
            login: 'Email đăng nhập',
          }
        }
      },
      home: {
        title: 'Danh sách lớp học',
        message: 'Bạn chưa có lớp học nào!'
      },
      class: {
        tab: {
          students: 'Sinh viên',
          documents: 'Tài liệu',
        },
        students: {
          title: 'Danh sách đồ án sinh viên',
          description: 'Sinh viên',
          name: 'Tên sinh viên',
          email: 'Email',
          studentCode: 'Mã sinh viên',
          project: 'Đề tài',
          report: 'Báo cáo',
          message: 'Tạo báo cáo thành công',
          progress: 'Tiến độ',
          uploadStudentsModal: {
            title: 'Thêm sinh viên và đồ án',
            label: 'File',
            helper: 'Chỉ chấp nhận file excel',
            error: 'File không đuọc để trống',
            cancel: 'Hủy',
            save: 'Lưu',
          },
          createReportModal: {
            title: 'Thêm mới báo cáo',
            name: 'Tên báo cáo',
            description: 'Mô tả báo cáo',
            startDate: 'Ngày bắt đầu',
            dueDate: 'Ngày kết thúc',
            cancel: 'Hủy',
            save: 'Lưu',
          }
        }
      },
      dashboard: {
        users: {
          title: 'Quản lý người dùng',
          name: 'Họ Tên',
          email: 'Email',
          role: 'Quyền',
          message: 'Thêm người dùng thành công',
          createModal: {
            title: 'Thêm mới người dùng',
            name: 'Tên',
            email: 'Email',
            password: 'Mật khẩu',
            role: 'Quyền',
            cancel: 'Hủy',
            save: 'Lưu',
            required: 'Trường này không được để trống'
          },
        }
      }
    }
  }
}))
