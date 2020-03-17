import React from "react";
import {
    Button,
    Divider,
    Popconfirm,
    Table,
    Form,
    Modal,
    Input,
    Select,
    Col,
    Row, Spin, DatePicker, Radio
} from 'antd';
import {connect} from 'react-redux';
import {queryPatientInfo, updatePatientInfo} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";

const FormItem = Form.Item;
const {Option} = Select;

interface PatientInfoOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface PatientInfoStateProps {
    loading?: any,
    patientInfo?: any,
}

interface PatientInfoDispatchProps {
    queryPatientInfo?: Function,
    updatePatientInfo?: Function,
}

interface PatientInfoState {
}

@(connect(
    (state: any) => (
        {
            loading: state.patientInfoReducer.loading,
            patientInfo: state.patientInfoReducer.patientInfo
        }
    ),
    (dispatch: any) => (
        {
            queryPatientInfo: (param: any) => {
                dispatch(queryPatientInfo(param));
            },
            updatePatientInfo: (param: any) => {
                dispatch(updatePatientInfo(param));
            },
        }
    )
) as any)
class PatientInfo extends React.Component<PatientInfoStateProps & PatientInfoDispatchProps & PatientInfoOwnProps, PatientInfoState> {
    private userData = JSON.parse(localStorage.getItem("userData"));

    constructor(props: PatientInfoStateProps & PatientInfoDispatchProps & PatientInfoOwnProps) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            patientname: this.userData.patientName,
            gender: this.userData.gender,
            birthDate: moment(this.userData.birthDate,"YYYY-MM-DD")
        })
    }

    formatDate = (date: string) => {
        if (!!date) {
            const dateArr = date.split("-");
            return new Date(Number(dateArr[0]), parseInt(dateArr[1]) - 1, Number(dateArr[2]));
        } else {
            return undefined;
        }
    }

    handleSubmitEdit = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.props.updatePatientInfo({
                    patientId: parseInt(this.userData.patientId),
                    patientName: values.patientname,
                    gender: parseInt(values.gender),
                    birthDate: moment(values.birthdate).format("YYYY-MM-DD")
                });
            }
        })
    }

    render() {
        const {form, loading} = this.props;
        const formLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 15,
            },
        };

        return (
            <Spin spinning={loading}>
                <Form style={{marginTop: 20, marginBottom: 20}}>
                    <FormItem key="patientname" {...formLayout} label="姓名">
                        {form.getFieldDecorator('patientname', {
                            rules: [{
                                required: true,
                                message: "请输入姓名"
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem key="gender" {...formLayout} label="性别">
                        {form.getFieldDecorator('gender', {
                            rules: [{
                                required: true,
                                message: "请输入性别"
                            }]
                        })(
                            <Radio.Group>
                                <Radio value={1}>女</Radio>
                                <Radio value={2}>男</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem key="birthdate" {...formLayout} label="出生日期">
                        {form.getFieldDecorator('birthDate', {
                            rules: [{
                                required: true,
                                message: "请输入姓名"
                            }]
                        })(
                            <DatePicker placeholder={"请选择出生日期"}/>
                        )}
                    </FormItem>
                    <Button htmlType="submit" type="primary" style={{marginLeft:100}} onClick={this.handleSubmitEdit}>
                        提交
                    </Button>
                </Form>
            </Spin>

        );
    }
}

export const PatientInfoForm = Form.create()(PatientInfo);