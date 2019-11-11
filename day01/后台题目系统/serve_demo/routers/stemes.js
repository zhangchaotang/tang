const express = require("express")
const router = express.Router()
const db = require("../db")

// 显示题干
router.get("/steme", (req, res) => {
  let sql = "select * from stem"
  db.query(sql, (error, data) => {
    if (error) {
      return res.json({
        code: 400,
        error: error
      })
    }
    res.json({
      code: 200,
      data: data
    })
  })
})

// 根据题干id显示对应题目
router.get("/subject/:id", (req, res) => {
  let id = req.params.id;
  let pageNum = parseInt(req.query.pageNum);
  // console.log(pageNum)
  // console.log(`select * from subject  where s_id = ${id}  limit ${pageNum - 1},1`)
  let sql = `select count(*) total from subject where s_id = ${id};
             select * from subject  where s_id = ${id}  limit ?,1`
  db.query(sql, pageNum - 1, (error, data) => {
    if (error) {
      console.log(error)
      return res.json({
        code: 400,
        error: error
      })
    }
    if (data[1].length == 0) {
      return res.json({
        code: 400,
        msg: "还没有这类题目哦!"
      })
    } else {
      db.query("select `conment` from accomplish where su_id = ? and u_id = 1", data[1][0].id, (error6, data6) => {
        if (error6) {
          return console.log(error)
        }
        res.json({
          code: 200,
          data: data[1],
          total: data[0][0].total,
          pageNum: pageNum,
          conment: data6[0]
        })
      })
    }
  })
})

// 根据选择的答案显示对还是错
router.post("/subject/:id", (req, res) => {
  let id = req.params.id; // 题目id
  // console.log(id)
  // 获取状态 是否答过
  let isright = req.body.isright;
  // console.log(isright)
  let answer = req.body.answer;
  let sql = "select * from `subject` where id = ?"
  db.query(sql, id, (error, data) => {
    if (error) {
      return res.json({
        code: 400,
        error: error
      })
    }
    if (data[0].answer == answer) {
      db.query("select intefral from user where id = 1", (error2, data2) => {
        if (error2) {
          console.log(error2)
          return res.json({
            code: 400,
            msg: "系统故障"
          })
        } else {
          if (isright) {
            db.query("update accomplish set isright = 1 ,conment = ? where su_id = ? and u_id = ?", [answer, id, 1], (error4, data4) => {
              if (error4) {
                console.log(error4)
                return res.json({
                  code: 400,
                  error: error4,
                  msg: "系统故障"
                })
              }
              res.json({
                code: 200,
                msg: "回答正确"
              })
            })
          } else {
            let intefral = parseInt(data2[0].intefral) + 1;
            db.query("update  user set intefral = ? where id = 1", [intefral], (error3, data3) => {
              if (error3) {
                console.log(error3)
                return res.json({
                  code: 400,
                  error: error3,
                  msg: "系统故障"
                })
              }
              db.query("insert into accomplish values(?,?,?,?,?)", [null, 1, id, 1, answer], (error4, data4) => {
                if (error4) {
                  console.log(error4)
                  return res.json({
                    code: 400,
                    error: error4,
                    msg: "系统故障"
                  })
                }
                res.json({
                  code: 200,
                  msg: "回答正确"
                })
              })
            })
          }
        }
      })
    } else {
      if (isright) {
        db.query("update accomplish set isright = 0,conment = ? where su_id = ? and u_id = ?", [answer, id, 1], (error5, data5) => {
          if (error5) {
            console.log(error5)
            return res.json({
              code: 400,
              error: error5,
              msg: "系统故障"
            })
          }
          res.json({
            code: 400,
            msg: "回答错误",
            data: data[0].answer
          })
        })
      } else {
        db.query("insert into accomplish values(?,?,?,?,?)", [null, 1, id, 0, answer], (error5, data5) => {
          if (error5) {
            console.log(error5)
            return res.json({
              code: 400,
              error: error5,
              msg: "系统故障"
            })
          }
          res.json({
            code: 400,
            msg: "回答错误",
            data: data[0].answer
          })
        })
      }
    }
  })
})


// 获取积分榜
router.get("/intefralTop", (req, res) => {
  let sql = "select * from user order by intefral limit 10"
  db.query(sql, (error, data) => {
    if (error) {
      res.json({
        code: 400,
        error: error,
        msg: "获取积分榜失败!"
      })
    } else {
      res.json({
        code: 200,
        data: data,
        msg: "获取积分榜成功!"
      })
    }
  })
})


// 获取答对和带错的题目
router.get("/acco_mista/:u_id", (req, res) => {
  let u_id = 1
  // 题干id
  let s_id = req.params.u_id
  // console.log(u_id)
  let sql = "select *  from accomplish where u_id = ? and isright = 1 group by su_id; select *  from accomplish where u_id = ? and isright = 0 group by su_id;select * from subject where s_id = ?"
  db.query(sql, [u_id, u_id, s_id], (error, data) => {
    if (error) {
      return res.json({
        code: 400,
        error: error
      })
    }
    res.json({
      code: 200,
      data: data
    })
  })
})


module.exports = router;