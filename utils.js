module.exports = {
    /**
     * Mongoose aggregate方法中使用的保留小数位数。
     *
     * 不能使用在$group中，可以在$group后面添加$addFields并使用此方法。
     *
     * @param value 需要处理的输入
     * @param num 保留的小数位数，不指定时默认为2
     * @returns {{$divide: *[]}}
     * @constructor
     */
    Aggregate_Round: function (value, num = undefined) {
        const p = Math.pow(10, num || 2);
        return {
            $divide: [
                {
                    $floor: {
                        $add: [
                            {
                                $multiply: [
                                    value,
                                    p
                                ]
                            },
                            0.49999999999999
                        ]
                    }
                },
                p
            ]
        };
    }
}